import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { getWordOfTheDay, saveGameProgress, loadGameProgress, calculateSimilarity, getHint, formatDate } from '../lib/gameUtils';
import { motion } from 'framer-motion';

interface KontextiGameProps {
  customWord?: string;
}

const KontextiGame: React.FC<KontextiGameProps> = ({ customWord }) => {
  const [secretWord, setSecretWord] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [attempts, setAttempts] = useState<Array<{ word: string; score: number }>>([]);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [currentHint, setCurrentHint] = useState<string>('');

  useEffect(() => {
    const initializeGame = () => {
      const word = customWord || getWordOfTheDay();
      setSecretWord(word);

      if (!customWord) {
        const { attempts: savedAttempts, hintsUsed: savedHintsUsed, isNewDay } = loadGameProgress();
        if (!isNewDay) {
          setAttempts(savedAttempts);
          setHintsUsed(savedHintsUsed);
          setGameWon(savedAttempts.some(attempt => attempt.score === 100));
        } else {
          setAttempts([]);
          setHintsUsed(0);
          setGameWon(false);
        }
      } else {
        setAttempts([]);
        setHintsUsed(0);
        setGameWon(false);
      }
      setCurrentHint('');
    };

    initializeGame();
  }, [customWord]);

  useEffect(() => {
    if (!customWord) {
      saveGameProgress(attempts, hintsUsed);
    }
  }, [attempts, hintsUsed, customWord]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const score = calculateSimilarity(input, secretWord);
    const newAttempt = { word: input, score };
    const updatedAttempts = [...attempts, newAttempt].sort((a, b) => b.score - a.score);
    setAttempts(updatedAttempts);
    setInput('');

    if (score === 100) {
      setGameWon(true);
    }
  };

  const handleHint = () => {
    const hint = getHint(secretWord);
    setCurrentHint(hint);
    setHintsUsed(hintsUsed + 1);
  };

  const handleGiveUp = () => {
    setGameWon(true);
    setAttempts([...attempts, { word: secretWord, score: 100 }]);
  };

  return (
    <Card className="w-full p-6 bg-white dark:bg-gray-800 shadow-lg">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kontexti</h2>
        <Badge variant={customWord ? "secondary" : "default"}>
          {customWord ? "Archive Word" : `Today's Word (${formatDate(new Date())})`}
        </Badge>
      </div>
      <form onSubmit={handleSubmit} className="mb-4">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a word"
          className="mb-2"
          disabled={gameWon}
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={gameWon} className="flex-1">
            Submit
          </Button>
          <Button type="button" variant="outline" onClick={handleHint} disabled={gameWon || hintsUsed >= 3} className="flex-1">
            Hint ({3 - hintsUsed})
          </Button>
          <Button type="button" variant="outline" onClick={handleGiveUp} disabled={gameWon} className="flex-1">
            Give Up
          </Button>
        </div>
      </form>

      {currentHint && (
        <div className="mt-2 mb-4 p-2 bg-blue-50 dark:bg-blue-900 rounded">
          <Badge variant="secondary">Hint</Badge>
          <p className="mt-1 text-sm">{currentHint}</p>
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Attempts</h2>
        <ul className="space-y-2">
          {attempts.map((attempt, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded"
            >
              <span>{attempt.word}</span>
              <div className="flex items-center gap-2">
                <Progress value={attempt.score} className="w-24" />
                <span className="text-sm font-semibold">{attempt.score}%</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {gameWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-center p-4 bg-green-100 dark:bg-green-800 rounded"
        >
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">Congratulations!</h2>
          <p className="text-green-700 dark:text-green-300">The secret word was: <span className="font-bold">{secretWord}</span></p>
        </motion.div>
      )}
    </Card>
  );
};

export default KontextiGame;