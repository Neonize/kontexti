import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const GameInstructions: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>How to play</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="instructions">
            <AccordionTrigger className="text-left">Click to expand instructions</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal list-inside space-y-2 mt-2">
                <li>Try to guess the secret word of the day.</li>
                <li>Enter a word and submit it to see how close you are.</li>
                <li>The similarity score (0-100) shows how close your guess is to the secret word.</li>
                <li>The color of the progress bar indicates your proximity:
                  <ul className="list-disc list-inside ml-4">
                    <li>Red: Far from the target word</li>
                    <li>Yellow: Getting closer</li>
                    <li>Green: Very close or correct</li>
                  </ul>
                </li>
                <li>Use hints if you're stuck (max 3 per game). Each hint reduces your final score.</li>
                <li>Keep guessing until you find the exact word or choose to give up.</li>
                <li>Your total score is calculated based on the number of attempts and hints used.</li>
                <li>Click on the game title to reset to the current day's word.</li>
                <li>Play past words from the archive to practice more!</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default GameInstructions;