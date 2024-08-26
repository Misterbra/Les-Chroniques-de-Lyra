"use client";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addJournalEntry } from '../../store/userSlice';
import { RootState } from '../../store';

const Journal: React.FC = () => {
  const [entry, setEntry] = useState('');
  const journalEntries = useSelector((state: RootState) => state.user.journalEntries);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addJournalEntry({ date: new Date().toISOString(), content: entry }));
    setEntry('');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Journal de Bord</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Note tes réflexions ici..."
          rows={4}
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Ajouter une entrée
        </button>
      </form>
      <div className="space-y-4">
        {journalEntries.map((entry, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded">
            <p className="text-sm text-gray-600">{new Date(entry.date).toLocaleDateString()}</p>
            <p>{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;