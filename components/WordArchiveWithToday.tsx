import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { getWordOfTheDay, getPastWords, formatDate } from '../lib/gameUtils';

interface WordArchiveWithTodayProps {
  onSelectWord: (word: string) => void;
  onResetToDaily: () => void;
}

const WordArchiveWithToday: React.FC<WordArchiveWithTodayProps> = ({ onSelectWord, onResetToDaily }) => {
  const todaysWord = getWordOfTheDay();
  const pastWords = getPastWords(7); // Get past 7 days' words

  return (
    <Card className="w-full bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle>Word Archive</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={onResetToDaily} variant="outline" className="w-full">
          Play Today's Challenge
        </Button>
        <Separator className="my-4" />
        <ul className="space-y-2">
          {pastWords.map((word, index) => {
            const date = new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000);
            return (
              <li key={index}>
                <Button
                  onClick={() => onSelectWord(word)}
                  variant="outline"
                  className="w-full justify-center"
                >
                  {formatDate(date)}
                </Button>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default WordArchiveWithToday;