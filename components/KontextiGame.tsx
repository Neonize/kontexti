import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
  getWordOfTheDay,
  saveGameProgress,
  loadGameProgress,
  calculateSimilarity,
  getHint,
  formatDate,
  getColorForScore,
  calculateTotalPoints
} from '../lib/gameUtils';
import { motion } from 'framer-motion';

interface KontextiGameProps {
  customWord?: string;
  onResetToDaily: () => void;
}

const KontextiGame: React.FC<KontextiGameProps> = ({ customWord, onResetToDaily }) => {
  const [secretWord, setSecretWord] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [attempts, setAttempts] = useState<Array<{ word: string; score: number }>>([]);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [pastHints, setPastHints] = useState<string[]>([]);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [totalPoints, setTotalPoints] = useState<number>(0);

  useEffect(() => {
    const initializeGame = () => {
      const word = customWord || getWordOfTheDay();
      setSecretWord(word);

      if (!customWord) {
        const { attempts: savedAttempts, hintsUsed: savedHintsUsed, pastHints: savedPastHints, isNewDay } = loadGameProgress();
        if (!isNewDay) {
          setAttempts(savedAttempts);
          setHintsUsed(savedHintsUsed);
          setPastHints(savedPastHints);
          setGameWon(savedAttempts.some(attempt => attempt.score === 100));
        } else {
          setAttempts([]);
          setHintsUsed(0);
          setPastHints([]);
          setGameWon(false);
        }
      } else {
        setAttempts([]);
        setHintsUsed(0);
        setPastHints([]);
        setGameWon(false);
      }
      setGameOver(false);
      setCurrentHint('');
      setTotalPoints(0);
    };

    initializeGame();
  }, [customWord]);

  useEffect(() => {
    if (!customWord) {
      saveGameProgress(attempts, hintsUsed, pastHints);
    }
  }, [attempts, hintsUsed, pastHints, customWord]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const score = await calculateSimilarity(input, secretWord);
    const newAttempt = { word: input, score };
    const updatedAttempts = [...attempts, newAttempt].sort((a, b) => b.score - a.score);
    setAttempts(updatedAttempts);
    setInput('');

    if (score === 100) {
      setGameWon(true);
      setGameOver(true);
      setTotalPoints(calculateTotalPoints(updatedAttempts.length, hintsUsed));
    }
  };

  const handleHint = () => {
    const hint = getHint(secretWord);
    setCurrentHint(hint);
    setPastHints([...pastHints, hint]);
    setHintsUsed(hintsUsed + 1);
  };

  const handleGiveUp = () => {
    setGameOver(true);
    setTotalPoints(0);
  };

  return (
    <Card className="w-full p-6 bg-white dark:bg-gray-800 shadow-lg">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kontexti</h2>
        <Badge variant={customWord ? "secondary" : "default"} className="cursor-pointer" onClick={onResetToDaily}>
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
          disabled={gameOver}
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={gameOver} className="flex-1">
            Submit
          </Button>
          <Button type="button" variant="outline" onClick={handleHint} disabled={gameOver || hintsUsed >= 3} className="flex-1">
            Hint ({3 - hintsUsed})
          </Button>
          <Button type="button" variant="outline" onClick={handleGiveUp} disabled={gameOver} className="flex-1">
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

      {pastHints.length > 0 && (
        <div className="mt-2 mb-4">
          <h3 className="font-semibold mb-1">Past Hints:</h3>
          <ul className="list-disc list-inside">
            {pastHints.map((hint, index) => (
              <li key={index} className="text-sm">{hint}</li>
            ))}
          </ul>
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
                <Progress value={attempt.score} className={`w-24 ${getColorForScore(attempt.score)}`} />
                <span className="text-sm font-semibold">{attempt.score}%</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`mt-4 text-center p-4 rounded ${gameWon ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800'}`}
        >
          {gameWon ? (
            <>
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">Congratulations!</h2>
              <p className="text-green-700 dark:text-green-300">You guessed the word: <span className="font-bold">{secretWord}</span></p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">Game Over</h2>
              <p className="text-red-700 dark:text-red-300">The word was: <span className="font-bold">{secretWord}</span></p>
            </>
          )}
          <p className="mt-2 font-semibold">Total Points: {totalPoints}</p>
        </motion.div>
      )}
    </Card>
  );
};

export default KontextiGame;