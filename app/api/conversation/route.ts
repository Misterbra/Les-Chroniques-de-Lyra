import { NextResponse } from 'next/server';
import axios from 'axios';

const TRAIT_KEYWORDS = {
  "Curieux": ["curiosité", "apprendre", "découvrir", "explorer"],
  "Créatif": ["créativité", "imagination", "innover", "art"],
  "Analytique": ["analyse", "logique", "résoudre", "comprendre"],
  "Leader": ["leadership", "guider", "initiative", "responsabilité"],
  "Empathique": ["empathie", "comprendre les autres", "écoute", "soutien"],
  "Persévérant": ["persévérance", "détermination", "effort", "ne pas abandonner"],
  "Organisé": ["organisation", "planification", "structure", "méthode"],
  "Communicatif": ["communication", "expression", "partage", "présentation"]
};

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

function generateInsights(traits: string[], careerDomains: string[]): string[] {
  return [
    ...traits.map(trait => `Tu sembles avoir un trait de ${trait.toLowerCase()}`),
    ...careerDomains.map(domain => `Tu montres un intérêt pour le domaine de ${domain}`)
  ];
}

export async function POST(req: Request) {
  try {
    const { messages, city } = await req.json();
    
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not set in environment variables');
    }

    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: "mixtral-8x7b-32768",
      messages: [
        { role: "system", content: `Tu es Elyan, un guide bienveillant dans le monde magique de Lyra. Tu aides les jeunes à explorer leurs intérêts et leurs passions pour découvrir des carrières potentielles. L'utilisateur vient de ${city}. Analyse ses réponses pour identifier des traits de personnalité, des insights sur ses intérêts, et des domaines de carrière potentiels. Réponds de manière encourageante et pose des questions pertinentes pour en apprendre plus sur l'utilisateur.` },
        ...messages
      ],
      max_tokens: 300,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const assistantMessage = response.data.choices[0].message.content;
    
    // Extraction des traits et domaines de carrière
    const traits = extractKeywords(assistantMessage, TRAIT_KEYWORDS);
    const careerDomains = extractKeywords(assistantMessage, CAREER_DOMAINS);
    
    // Génération d'insights
    const insights = generateInsights(traits, careerDomains);
    
    // Calcul de l'expérience gagnée
    const experience = (traits.length + careerDomains.length) * 5;

    return NextResponse.json({
      message: assistantMessage,
      insights,
      traits,
      careerDomains,
      experience
    });
  } catch (error) {
    console.error('Erreur lors de la communication avec l\'API Groq:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Une erreur inconnue est survenue' }, { status: 500 });
  }
}