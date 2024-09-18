import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { getPastWords, formatDate } from '../lib/gameUtils';

interface WordArchiveProps {
  onSelectWord: (word: string) => void;
}

const WordArchive: React.FC<WordArchiveProps> = ({ onSelectWord }) => {
  const pastWords = getPastWords(7); // Get past 7 days' words
  const today = new Date();

  return (
    <Card className="w-full p-6 bg-white dark:bg-gray-800 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Word Archive</h2>
      <ul className="space-y-2">
        {pastWords.map((word, index) => {
          const date = new Date(today);
          date.setDate(today.getDate() - index - 1);
          return (
            <li key={index} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded">
              <span className="text-sm">{formatDate(date)}</span>
              <Button variant="outline" size="sm" onClick={() => onSelectWord(word)}>
                Play
              </Button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default WordArchive;