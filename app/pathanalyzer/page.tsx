"use client";
import React, { useState } from 'react';
import { useAppSelector } from '../../store/hook';
import axios from 'axios';

const PathAnalyzer: React.FC = () => {
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const journalEntries = useAppSelector((state) => state.user.journalEntries);
  const userTraits = useAppSelector((state) => state.user.traits);

  const analyzeJournal = async () => {
    setLoading(true);
    try {
      const journalText = journalEntries.map(entry => entry.content).join(' ');
      const response = await axios.post('/api/analyzepath', {
        journal: journalText,
        traits: userTraits,
      });
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error('Erreur lors de lanalyse :', error);
      setAnalysis('Désolé, une erreur sest produite lors de lanalyse.');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Analyseur de Parcours</h2>
      <button
        onClick={analyzeJournal}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        disabled={loading}
      >
        {loading ? 'Analyse en cours...' : 'Analyser mon parcours'}
      </button>
      {analysis && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Analyse de ton parcours :</h3>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default PathAnalyzer;