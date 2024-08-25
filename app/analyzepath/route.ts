import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    const { journal, traits } = req.body;
    
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: 'mixtral-8x7b-32768',
      messages: [
        { role: 'system', content: 'Tu es un conseiller en orientation professionnelle expert. Analyse le journal et les traits de lutilisateur pour suggérer des domaines détudes et des carrières potentielles.' },
        { role: 'user', content: `Journal: ${journal}\n\nTraits: ${traits.join(', ')}` }
      ],
      max_tokens: 300,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const analysis = response.data.choices[0].message.content;
    res.status(200).json({ analysis });
  } catch (error) {
    console.error('Erreur lors de lanalyse du parcours:', error);
    res.status(500).json({ error: 'Erreur lors de lanalyse du parcours' });
  }
}