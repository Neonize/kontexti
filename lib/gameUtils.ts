import { words } from './words';

export const getWordOfTheDay = (): string => {
  const today = new Date();
  const index = (today.getFullYear() * 100 + today.getMonth() * 31 + today.getDate()) % words.length;
  return words[index].toLowerCase();
};

export interface GameState {
  attempts: Array<{ word: string; score: number }>;
  hintsUsed: number;
  pastHints: string[];
  gameWon: boolean;
  givenUp: boolean;
}

export const saveGameProgress = (word: string, state: GameState): void => {
  const savedStates = JSON.parse(localStorage.getItem('kontextiGameStates') || '{}');
  savedStates[word] = state;
  localStorage.setItem('kontextiGameStates', JSON.stringify(savedStates));
};

export const loadGameProgress = (word: string): GameState | null => {
  const savedStates = JSON.parse(localStorage.getItem('kontextiGameStates') || '{}');
  return savedStates[word] || null;
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
    const index = (pastDate.getFullYear() * 100 + pastDate.getMonth() * 31 + pastDate.getDate()) % words.length;
    pastWords.push(words[index].toLowerCase());
  }

  return pastWords;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const calculateTotalPoints = (attempts: number, hintsUsed: number): number => {
  const basePoints = 1000;
  const pointsPerAttempt = 50;
  const pointsPerHint = 100;

  return Math.max(0, basePoints - (attempts * pointsPerAttempt) - (hintsUsed * pointsPerHint));
};