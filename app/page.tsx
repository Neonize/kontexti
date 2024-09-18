'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import KontextiGame from '../components/KontextiGame';
import WordArchive from '../components/WordArchive';
import GameInstructions from '../components/GameInstructions';
import { getWordOfTheDay } from '../lib/gameUtils';

export default function Home() {
  const [currentWord, setCurrentWord] = useState<string>(getWordOfTheDay());

  const handleSelectWord = (word: string) => {
    setCurrentWord(word);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gray-50 dark:bg-gray-900">
      <header className="w-full max-w-4xl text-center mb-8">
        <motion.h1
          className="text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
      </header>
      <motion.main
        className="w-full max-w-4xl flex flex-col lg:flex-row gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex-1">
          <KontextiGame key={currentWord} customWord={currentWord} />
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
