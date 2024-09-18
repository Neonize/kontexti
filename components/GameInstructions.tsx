import React from 'react';
import { Card } from './ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const GameInstructions: React.FC = () => {
  return (
    <Card className="w-full p-6 bg-white dark:bg-gray-800 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">How to Play</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="instructions">
          <AccordionTrigger className="text-left">Click to expand instructions</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal list-inside space-y-2 mt-2">
              <li>Try to guess the secret word of the day.</li>
              <li>Enter a word and submit it to see how close you are.</li>
              <li>The similarity score (0-100) shows how close your guess is to the secret word.</li>
              <li>Use the hints if you're stuck (max 3 per game).</li>
              <li>Keep guessing until you find the exact word or give up.</li>
              <li>Play past words from the archive to practice more!</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default GameInstructions;