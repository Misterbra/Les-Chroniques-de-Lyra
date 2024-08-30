import { NextResponse } from 'next/server';
import axios from 'axios';

interface Location {
  name: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  emoji: string;
  relatedInterests: string[];
}

const CAREER_DOMAINS = {
  "Technologie": ["informatique", "programmation", "développement", "tech"],
  "Santé": ["médecine", "soins", "bien-être", "santé"],
  "Art": ["création", "design", "musique", "peinture"],
  "Science": ["recherche", "expérimentation", "laboratoire", "découverte"],
  "Business": ["entreprise", "management", "entrepreneuriat", "finance"],
  "Education": ["enseignement", "formation", "apprentissage", "pédagogie"],
  "Environment": ["écologie", "durabilité", "nature", "conservation"],
  "Media": ["journalisme", "communication", "réseaux sociaux", "production"]
};

function extractKeywords(text: string, keywords: { [key: string]: string[] }): string[] {
  return Object.entries(keywords)
    .filter(([_, words]) => words.some(word => text.toLowerCase().includes(word)))
    .map(([key, _]) => key);
}

export async function POST(req: Request) {
  try {
    const { messages, city } = await req.json();
    
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not set in environment variables');
    }

    // Analyse de la conversation complète
    const conversationAnalysis = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: "mixtral-8x7b-32768",
      messages: [
        { role: "system", content: `Analyse la conversation suivante et extrais les intérêts, compétences et objectifs de carrière de l'utilisateur. Génère ensuite une liste de 5 à 10 lieux pertinents dans la ville de ${city} qui correspondent à ces éléments. Pour chaque lieu, fournis les informations suivantes dans un format JSON :
        {
          "name": "Nom du lieu",
          "description": "Brève description du lieu et de sa pertinence pour l'utilisateur",
          "coordinates": {
            "lat": latitude approximative,
            "lng": longitude approximative
          },
          "emoji": "Un emoji représentatif du lieu",
          "relatedInterests": ["Liste", "des intérêts", "liés"]
        }
        Utilise tes connaissances pour fournir des coordonnées approximatives dans la ville mentionnée.` },
        ...messages,
        { role: "user", content: `Basé sur notre conversation, peux-tu me suggérer des lieux intéressants à ${city} qui correspondent à mes intérêts et objectifs de carrière ?` }
      ],
      max_tokens: 1000,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const generatedLocations: Location[] = JSON.parse(conversationAnalysis.data.choices[0].message.content);

    // Extraction des domaines de carrière à partir de la conversation
    const allText = messages.map((msg: { content: string }) => msg.content).join(' ');
    const careerDomains = extractKeywords(allText, CAREER_DOMAINS);

    // Obtention des coordonnées de la ville
    const geocodingResponse = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`);
    const cityCoordinates = {
      lat: parseFloat(geocodingResponse.data[0].lat),
      lng: parseFloat(geocodingResponse.data[0].lon)
    };

    // Vérification et ajustement des coordonnées si nécessaire
    const locationsWithAdjustedCoordinates = generatedLocations.map((location: Location) => {
      const { lat, lng } = location.coordinates;
      if (Math.abs(lat - cityCoordinates.lat) > 0.5 || Math.abs(lng - cityCoordinates.lng) > 0.5) {
        return {
          ...location,
          coordinates: {
            lat: cityCoordinates.lat + (Math.random() - 0.5) * 0.1,
            lng: cityCoordinates.lng + (Math.random() - 0.5) * 0.1
          }
        };
      }
      return location;
    });

    return NextResponse.json({
      cityCoordinates,
      locations: locationsWithAdjustedCoordinates,
      careerDomains
    });

  } catch (error) {
    console.error('Erreur lors de l\'analyse de la conversation:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Une erreur inconnue est survenue' }, { status: 500 });
  }
}