"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addJournalEntry } from '../../store/userSlice';
import { RootState } from '../../store';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPencilAlt, FaBook, FaSave, FaTimes } from 'react-icons/fa';

const Journal: React.FC = () => {
  const [entry, setEntry] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const journalEntries = useSelector((state: RootState) => state.user.journalEntries);
  const dispatch = useDispatch();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isWriting && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isWriting]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (entry.trim()) {
      dispatch(addJournalEntry({ date: new Date().toISOString(), content: entry }));
      setEntry('');
      setIsWriting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 rounded-lg shadow-lg text-white"
    >
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        <FaBook className="mr-3" /> Journal de Bord Magique
      </h2>
      
      {!isWriting ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsWriting(true)}
          className="flex items-center justify-center w-full py-3 bg-white text-purple-600 rounded-lg shadow transition duration-300 hover:bg-purple-100"
        >
          <FaPencilAlt className="mr-2" /> Écrire une nouvelle entrée
        </motion.button>
      ) : (
        <motion.form
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          onSubmit={handleSubmit}
          className="mb-6"
        >
          <textarea
            ref={textareaRef}
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="w-full p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-inner text-white placeholder-purple-200"
            placeholder="Écris tes pensées magiques ici..."
            rows={4}
          />
          <div className="flex justify-end mt-2 space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex items-center px-4 py-2 bg-green-500 rounded-lg shadow transition duration-300 hover:bg-green-600"
            >
              <FaSave className="mr-2" /> Sauvegarder
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsWriting(false)}
              className="flex items-center px-4 py-2 bg-red-500 rounded-lg shadow transition duration-300 hover:bg-red-600"
            >
              <FaTimes className="mr-2" /> Annuler
            </motion.button>
          </div>
        </motion.form>
      )}

      <AnimatePresence>
        {journalEntries.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white bg-opacity-20 backdrop-blur-lg p-4 rounded-lg shadow mb-4"
          >
            <p className="text-sm text-purple-200 mb-2">{new Date(entry.date).toLocaleDateString()} - Entrée magique</p>
            <p className="text-white">{entry.content}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default Journal;