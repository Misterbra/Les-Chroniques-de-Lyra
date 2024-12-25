import { NextResponse } from 'next/server';
import axios from 'axios';

// Define interfaces for our data structures
interface PlaceTypes {
  [key: string]: string[];
}

interface Coordinates {
  lat: number;
  lng: number;
  bounds?: {
    northeast: { lat: number; lng: number };
    southwest: { lat: number; lng: number };
  };
}

interface OverpassPlace {
  id: number;
  lat: number;
  lon: number;
  tags: {
    name?: string;
    amenity: string;
    [key: string]: string | undefined;
  };
}

interface EnrichedPlace {
  id: number;
  name: string;
  type: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
}

interface AnalysisResponse {
  careerDomains: string[];
  descriptions: { [key: string]: string };
  interests: string[];
}

// Types de lieux en fonction des domaines de carrière
const PLACE_TYPES: PlaceTypes = {
  "Technologie": ["hackerspace", "école d'informatique", "incubateur", "fab lab"],
  "Santé": ["centre médical", "école de santé", "laboratoire", "centre sportif"],
  "Art": ["galerie d'art", "école d'art", "théâtre", "studio de musique"],
  "Science": ["musée des sciences", "laboratoire", "observatoire", "centre de recherche"],
  "Business": ["pépinière d'entreprises", "espace de coworking", "école de commerce"],
  "Education": ["bibliothèque", "centre de formation", "université", "médiathèque"],
  "Environment": ["parc naturel", "association écologique", "jardin botanique"],
  "Media": ["studio de production", "école de journalisme", "radio locale"]
};

const LOCATION_TYPES: PlaceTypes = {
  education: ["school", "university", "college", "library"],
  culture: ["museum", "theatre", "cinema", "art_gallery", "music_venue"],
  technology: ["it_school", "coworking_space", "hackerspace"],
  health: ["sports_centre", "healthcare", "hospital"],
  business: ["office", "coworking", "business_centre"],
  environment: ["park", "nature_reserve", "botanical_garden"]
};

async function getCityCoordinates(city: string): Promise<Coordinates> {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${process.env.OPENCAGE_API_KEY}`
    );
    
    if (response.data.results && response.data.results[0]) {
      return {
        lat: response.data.results[0].geometry.lat,
        lng: response.data.results[0].geometry.lng,
        bounds: response.data.results[0].bounds
      };
    }
    throw new Error('Ville non trouvée');
  } catch (error) {
    console.error('Erreur lors de la géolocalisation:', error);
    throw error;
  }
}

async function findRelevantPlaces(coordinates: Coordinates, careerDomains: string[]): Promise<OverpassPlace[]> {
  try {
    const locationQueries = careerDomains.flatMap(domain => 
      (PLACE_TYPES[domain] || [])
        .map(placeType => `node["amenity"~"${placeType}"](around:5000,${coordinates.lat},${coordinates.lng});`)
    );

    const query = `[out:json];(${locationQueries.join('')});out body;`;
    const response = await axios.get(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
    );

    return response.data.elements;
  } catch (error) {
    console.error('Erreur lors de la recherche des lieux:', error);
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    const { messages, city } = await req.json();

    // Analyse de la conversation avec GROQ
    const analysisResponse = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: "mixtral-8x7b-32768",
      messages: [
        {
          role: "system",
          content: `Analyse la conversation et fournis un résumé au format JSON avec:
            1. Les domaines de carrière qui intéressent l'utilisateur (parmi: ${Object.keys(PLACE_TYPES).join(', ')})
            2. Une liste de types de lieux qui pourraient l'aider dans son parcours
            3. Une courte description de ce qui l'intéresse dans chaque domaine`
        },
        ...messages
      ],
      response_format: { type: "json_object" }
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const analysis = analysisResponse.data.choices[0].message.content;
    const parsedAnalysis: AnalysisResponse = JSON.parse(analysis);

    // Obtenir les coordonnées de la ville
    const cityCoordinates = await getCityCoordinates(city);

    // Trouver les lieux pertinents
    const places = await findRelevantPlaces(cityCoordinates, parsedAnalysis.careerDomains);

    // Enrichir les descriptions des lieux
    const enrichedPlaces: EnrichedPlace[] = places.map((place: OverpassPlace) => ({
      id: place.id,
      name: place.tags.name || place.tags.amenity,
      type: place.tags.amenity,
      coordinates: {
        lat: place.lat,
        lng: place.lon
      },
      description: parsedAnalysis.descriptions[parsedAnalysis.careerDomains.find((domain: string) => 
        PLACE_TYPES[domain]?.includes(place.tags.amenity)
      ) || ''] || "Un lieu intéressant à explorer"
    }));

    return NextResponse.json({
      cityCoordinates,
      locations: enrichedPlaces,
      analysis: {
        careerDomains: parsedAnalysis.careerDomains,
        interests: parsedAnalysis.interests
      }
    });

  } catch (error) {
    console.error('Erreur lors de l\'analyse:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'analyse de la conversation' },
      { status: 500 }
    );
  }
}