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

export const saveGameProgress = (attempts: Array<{ word: string; score: number }>, hintsUsed: number) => {
  localStorage.setItem('kontextiAttempts', JSON.stringify(attempts));
  localStorage.setItem('kontextiHintsUsed', hintsUsed.toString());
  localStorage.setItem('kontextiDate', new Date().toDateString());
};

export const loadGameProgress = (): {
  attempts: Array<{ word: string; score: number }>,
  hintsUsed: number,
  isNewDay: boolean
} => {
  const savedAttempts = localStorage.getItem('kontextiAttempts');
  const savedHintsUsed = localStorage.getItem('kontextiHintsUsed');
  const savedDate = localStorage.getItem('kontextiDate');
  const today = new Date().toDateString();

  if (savedAttempts && savedHintsUsed && savedDate === today) {
    return {
      attempts: JSON.parse(savedAttempts),
      hintsUsed: parseInt(savedHintsUsed, 10),
      isNewDay: false
    };
  }

  return { attempts: [], hintsUsed: 0, isNewDay: true };
};

// More realistic mock function for similarity calculation
export const calculateSimilarity = (input: string, target: string): number => {
  if (input.toLowerCase() === target.toLowerCase()) return 100;

  const inputChars = input.toLowerCase().split('');
  const targetChars = target.toLowerCase().split('');

  const commonChars = inputChars.filter(char => targetChars.includes(char));
  const lengthSimilarity = 1 - Math.abs(input.length - target.length) / Math.max(input.length, target.length);

  const charSimilarity = commonChars.length / Math.max(input.length, target.length);
  const positionSimilarity = commonChars.filter((char, index) => char === targetChars[index]).length / Math.max(input.length, target.length);

  const similarity = (lengthSimilarity * 0.2 + charSimilarity * 0.4 + positionSimilarity * 0.4) * 100;
  return Math.round(similarity);
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