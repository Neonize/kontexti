'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import KontextiGame from '../components/KontextiGame';
import WordArchiveWithToday from '../components/WordArchiveWithToday';
import GameInstructions from '../components/GameInstructions';
import { getWordOfTheDay } from '../lib/gameUtils';
import { ThemeToggle } from '../components/theme-toggle';

export default function Home() {
  const [currentWord, setCurrentWord] = useState<string>(getWordOfTheDay());

  const handleSelectWord = (word: string) => {
    setCurrentWord(word);
  };

  const handleResetToDaily = () => {
    setCurrentWord(getWordOfTheDay());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 text-gray-900 dark:text-gray-100">
      <header className="w-full max-w-4xl text-center mb-6 flex flex-col items-center">
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
          className="text-gray-600 dark:text-gray-400 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Guess the word based on semantic similarity!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ThemeToggle />
        </motion.div>
      </header>
      <motion.main
        className="w-full max-w-4xl flex flex-col lg:flex-row gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex-1">
          <KontextiGame
            key={currentWord}
            customWord={currentWord !== getWordOfTheDay() ? currentWord : undefined}
            onResetToDaily={handleResetToDaily}
          />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <GameInstructions />
          <WordArchiveWithToday onSelectWord={handleSelectWord} onResetToDaily={handleResetToDaily} />
        </div>
      </motion.main>
      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2024 Kontexti. All rights reserved.
      </footer>
    </div>
  );
}
