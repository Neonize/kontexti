'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import KontextiGame from '../components/KontextiGame';
import WordArchive from '../components/WordArchive';
import GameInstructions from '../components/GameInstructions';
import { getWordOfTheDay } from '../lib/gameUtils';
import { useTheme } from 'next-themes';

export default function Home() {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [isCustomWord, setIsCustomWord] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setCurrentWord(getWordOfTheDay());
  }, []);

  const handleSelectWord = (word: string) => {
    setCurrentWord(word);
    setIsCustomWord(true);
  };

  const handleResetToDaily = () => {
    setCurrentWord(getWordOfTheDay());
    setIsCustomWord(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="w-full max-w-4xl text-center mb-8">
        <motion.h1
          className="text-4xl font-bold mb-2 cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleResetToDaily}
        >
          Kontexti
        </motion.h1>
        <motion.p
          className="text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Guess the word based on semantic similarity!
        </motion.p>
        <button
          onClick={toggleTheme}
          className="mt-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
        >
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </header>
      <motion.main
        className="w-full max-w-4xl flex flex-col lg:flex-row gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex-1">
          <KontextiGame
            key={currentWord}
            customWord={isCustomWord ? currentWord : undefined}
            onResetToDaily={handleResetToDaily}
          />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <GameInstructions />
          <WordArchive onSelectWord={handleSelectWord} />
        </div>
      </motion.main>
      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2023 Kontexti. All rights reserved.
      </footer>
    </div>
  );
}
