import fetch from 'node-fetch';

// Array of words for the game
const words = [
  'apple', 'banana', 'cherry', 'date', 'elderberry',
  'fig', 'grape', 'honeydew', 'kiwi', 'lemon',
  'mango', 'nectarine', 'orange', 'papaya', 'quince',
  'raspberry', 'strawberry', 'tangerine', 'ugli fruit', 'watermelon'
];

export const getWordOfTheDay = (date: Date = new Date()): string => {
  const index = (date.getFullYear() * 100 + date.getMonth() * 31 + date.getDate()) % words.length;
  return words[index].toLowerCase();
};

export const getDateForWord = (word: string): string => {
  const index = words.findIndex(w => w.toLowerCase() === word.toLowerCase());
  if (index === -1) return '';

  const startDate = new Date(2023, 0, 1); // Assuming the game started on Jan 1, 2023
  const wordDate = new Date(startDate.getTime() + index * 24 * 60 * 60 * 1000);
  return formatDate(wordDate);
};

export const saveGameProgress = (
  word: string,
  attempts: Array<{ word: string; score: number }>,
  hintsUsed: number,
  pastHints: string[]
) => {
  const date = getDateForWord(word);
  const gameState = {
    word,
    attempts,
    hintsUsed,
    pastHints,
    date
  };
  const savedStates = JSON.parse(localStorage.getItem('kontextiGameStates') || '{}');
  savedStates[date] = gameState;
  localStorage.setItem('kontextiGameStates', JSON.stringify(savedStates));
};

export const loadGameProgress = (word: string): {
  attempts: Array<{ word: string; score: number }>,
  hintsUsed: number,
  pastHints: string[],
  isNewGame: boolean
} => {
  const date = getDateForWord(word);
  const savedStates = JSON.parse(localStorage.getItem('kontextiGameStates') || '{}');
  const savedState = savedStates[date];

  if (savedState && savedState.word === word) {
    return {
      attempts: savedState.attempts,
      hintsUsed: savedState.hintsUsed,
      pastHints: savedState.pastHints,
      isNewGame: false
    };
  }

  return { attempts: [], hintsUsed: 0, pastHints: [], isNewGame: true };
};

export const calculateSimilarity = async (input: string, target: string): Promise<number> => {
  try {
    const response = await fetch('/api/calculate-similarity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: input.toLowerCase(), target: target.toLowerCase() }),
    });

    if (!response.ok) {
      throw new Error('Failed to calculate similarity');
    }

    const data = await response.json();
    return data.score;
  } catch (error) {
    console.error("Error calculating similarity:", error);
    return 0;
  }
};

export const getHint = (secretWord: string): string => {
  const hints = [
    `The word starts with "${secretWord[0]}"`,
    `The word has ${secretWord.length} letters`,
    `The word ends with "${secretWord[secretWord.length - 1]}"`,
    `The word contains the letter "${secretWord[Math.floor(secretWord.length / 2)]}"`,
  ];
  return hints[Math.floor(Math.random() * hints.length)].toLowerCase();
};

export const getPastWords = (days: number): string[] => {
  const pastWords: string[] = [];
  const today = new Date();

  for (let i = 1; i <= days; i++) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);
    pastWords.push(getWordOfTheDay(pastDate));
  }

  return pastWords;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const getColorForScore = (score: number): string => {
  if (score < 33) return 'bg-red-500';
  if (score < 66) return 'bg-yellow-500';
  return 'bg-green-500';
};

export const calculateTotalPoints = (attempts: number, hintsUsed: number): number => {
  const basePoints = 1000;
  const pointsPerAttempt = 50;
  const pointsPerHint = 100;

  return Math.max(0, basePoints - (attempts * pointsPerAttempt) - (hintsUsed * pointsPerHint));
};