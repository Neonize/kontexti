import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import {
  getWordOfTheDay,
  saveGameProgress,
  loadGameProgress,
  calculateSimilarity,
  getHint,
  formatDate,
  getColorForScore,
  calculateTotalPoints,
  GameState
} from '../lib/gameUtils';
import { motion } from 'framer-motion';

interface KontextiGameProps {
  customWord?: string;
  onResetToDaily: () => void;
}

const KontextiGame: React.FC<KontextiGameProps> = ({ customWord, onResetToDaily }) => {
  const [secretWord, setSecretWord] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [attempts, setAttempts] = useState<Array<{ word: string; score: number | null }>>([]);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [givenUp, setGivenUp] = useState<boolean>(false);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [pastHints, setPastHints] = useState<string[]>([]);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initializeGame = async () => {
      setIsLoading(true);
      const word = customWord || getWordOfTheDay();
      setSecretWord(word.toLowerCase());

      const savedState = loadGameProgress(word);
      if (savedState) {
        setAttempts(savedState.attempts);
        setHintsUsed(savedState.hintsUsed);
        setPastHints(savedState.pastHints);
        setGameWon(savedState.gameWon);
        setGivenUp(savedState.givenUp);
      } else {
        resetGame();
      }
      setIsLoading(false);
    };

    initializeGame();
  }, [customWord]);

  const resetGame = () => {
    setAttempts([]);
    setHintsUsed(0);
    setPastHints([]);
    setGameWon(false);
    setGivenUp(false);
    setCurrentHint('');
    setTotalPoints(0);
  };

  useEffect(() => {
    const gameState: GameState = {
      attempts: attempts.filter(a => a.score !== null) as Array<{ word: string; score: number }>,
      hintsUsed,
      pastHints,
      gameWon,
      givenUp
    };
    saveGameProgress(secretWord, gameState);
  }, [secretWord, attempts, hintsUsed, pastHints, gameWon, givenUp]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || gameWon || givenUp) return;

    const trimmedInput = input.trim().toLowerCase();

    // Check if the word is already in the list of guesses
    if (attempts.some(attempt => attempt.word === trimmedInput)) {
      setInput('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }

    // Add the new attempt with a null score (loading state)
    setAttempts(prev => [...prev, { word: trimmedInput, score: null }]);
    setInput('');

    // Calculate the similarity
    const score = await calculateSimilarity(trimmedInput, secretWord);

    // Update the attempt with the actual score
    setAttempts(prev => {
      const updated = prev.map(a => a.word === trimmedInput ? { ...a, score } : a);
      return updated.sort((a, b) => (b.score || 0) - (a.score || 0));
    });

    if (score === 100) {
      setGameWon(true);
      setTotalPoints(calculateTotalPoints(attempts.length + 1, hintsUsed));
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleHint = () => {
    if (gameWon || givenUp || hintsUsed >= 3) return;

    let hint: string;
    do {
      hint = getHint(secretWord);
    } while (pastHints.includes(hint));

    if (currentHint) {
      setPastHints([...pastHints, currentHint]);
    }
    setCurrentHint(hint);
    setHintsUsed(hintsUsed + 1);
  };

  const handleGiveUp = () => {
    if (!gameWon && !givenUp) {
      setGivenUp(true);
      setTotalPoints(0);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full p-6 bg-white dark:bg-gray-800 shadow-lg">
        <Skeleton className="w-full h-8 mb-4" />
        <Skeleton className="w-full h-10 mb-2" />
        <div className="flex gap-2">
          <Skeleton className="w-1/3 h-10" />
          <Skeleton className="w-1/3 h-10" />
          <Skeleton className="w-1/3 h-10" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full p-6 bg-white dark:bg-gray-800 shadow-lg">
      <div className="mb-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2">Kontexti</h2>
        <Badge variant={customWord ? "secondary" : "default"} className="cursor-pointer" onClick={onResetToDaily}>
          {customWord ? "Archive Word" : `Today's Word (${formatDate(new Date())})`}
        </Badge>
      </div>

      {(gameWon || givenUp) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`mb-4 text-center p-4 rounded ${gameWon ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800'}`}
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

      <form onSubmit={handleSubmit} className="mb-4">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a word"
          className="mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          disabled={gameWon || givenUp}
          ref={inputRef}
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={gameWon || givenUp} className="flex-1">
            Submit
          </Button>
          <Button type="button" variant="outline" onClick={handleHint} disabled={gameWon || givenUp || hintsUsed >= 3} className="flex-1">
            Hint ({3 - hintsUsed})
          </Button>
          <Button type="button" variant="outline" onClick={handleGiveUp} disabled={gameWon || givenUp} className="flex-1">
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
                {attempt.score === null ? (
                  <Skeleton className="w-24 h-4" />
                ) : (
                  <>
                    <Progress value={attempt.score} className={`w-24 ${getColorForScore(attempt.score)}`} />
                    <span className="text-sm font-semibold">{attempt.score}%</span>
                  </>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default KontextiGame;