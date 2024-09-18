# Kontexti - Word Guessing Game

Kontexti is a daily word guessing game where players attempt to guess a secret word by entering semantically similar words. The game provides similarity scores based on the semantic proximity of the guessed words to the secret word.

## Features

- Daily word generation
- Word input and evaluation based on semantic similarity
- Attempt history with similarity scores
- Hint system (3 hints per game)
- Progress saving using local storage
- Archive of past words for continuous play
- Responsive design for various screen sizes

## Technology Stack

- Frontend: Next.js with TypeScript
- UI: shadcn components and Tailwind CSS
- State Management: React Hooks
- Animations: Framer Motion

## Getting Started

To run the Kontexti game locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/kontexti.git
   cd kontexti
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## How to Play

1. Try to guess the secret word of the day.
2. Enter a word and submit it to see how close you are.
3. The similarity score (0-100) shows how close your guess is to the secret word.
4. Use hints if you're stuck (max 3 per game).
5. Keep guessing until you find the exact word or give up.
6. Play past words from the archive to practice more!

## Contributing

Contributions to Kontexti are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
