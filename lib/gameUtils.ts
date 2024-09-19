// Array of words for the game
const words = [
  'apple', 'banana', 'cherry', 'date', 'elderberry',
  'fig', 'grape', 'honeydew', 'kiwi', 'lemon',
  'mango', 'nectarine', 'orange', 'papaya', 'quince',
  'raspberry', 'strawberry', 'tangerine', 'ugli fruit', 'watermelon'
];

export const getWordOfTheDay = (): string => {
  const today = new Date();
  const index = (today.getFullYear() * 100 + today.getMonth() * 31 + today.getDate()) % words.length;
  return words[index];
};

export const saveGameProgress = (
  attempts: Array<{ word: string; score: number }>,
  hintsUsed: number,
  pastHints: string[]
) => {
  localStorage.setItem('kontextiAttempts', JSON.stringify(attempts));
  localStorage.setItem('kontextiHintsUsed', hintsUsed.toString());
  localStorage.setItem('kontextiPastHints', JSON.stringify(pastHints));
  localStorage.setItem('kontextiDate', new Date().toDateString());
};

export const loadGameProgress = (): {
  attempts: Array<{ word: string; score: number }>,
  hintsUsed: number,
  pastHints: string[],
  isNewDay: boolean
} => {
  const savedAttempts = localStorage.getItem('kontextiAttempts');
  const savedHintsUsed = localStorage.getItem('kontextiHintsUsed');
  const savedPastHints = localStorage.getItem('kontextiPastHints');
  const savedDate = localStorage.getItem('kontextiDate');
  const today = new Date().toDateString();

  if (savedAttempts && savedHintsUsed && savedPastHints && savedDate === today) {
    return {
      attempts: JSON.parse(savedAttempts),
      hintsUsed: parseInt(savedHintsUsed, 10),
      pastHints: JSON.parse(savedPastHints),
      isNewDay: false
    };
  }

  return { attempts: [], hintsUsed: 0, pastHints: [], isNewDay: true };
};

export const calculateSimilarity = async (input: string, target: string): Promise<number> => {
  try {
    const response = await fetch('/api/calculate-similarity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input, target }),
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
  return hints[Math.floor(Math.random() * hints.length)];
};

export const getPastWords = (days: number): string[] => {
  const pastWords: string[] = [];
  const today = new Date();

  for (let i = 1; i <= days; i++) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);
    const index = (pastDate.getFullYear() * 100 + pastDate.getMonth() * 31 + pastDate.getDate()) % words.length;
    pastWords.push(words[index]);
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