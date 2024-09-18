# Kontexti - Word Guessing Game

Kontexti is a daily word guessing game where players attempt to guess a secret word by entering semantically similar words. The game provides similarity scores based on the semantic proximity of the guessed words to the secret word, using OpenAI's text embedding model.

## Features

- Daily word generation
- Word input and evaluation based on semantic similarity using OpenAI embeddings
- Color-coded attempt history with similarity scores
- Hint system (3 hints per game) with past hints display
- Progress saving using local storage
- Archive of past words for continuous play
- Dark mode support
- Responsive design for various screen sizes
- Total points calculation based on attempts and hints used

## Technology Stack

- Frontend: Next.js 14 with TypeScript
- UI: shadcn components and Tailwind CSS
- State Management: React Hooks
- Animations: Framer Motion
- API Integration: OpenAI API for text embeddings
- Theming: next-themes for dark mode support

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

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
   
   IMPORTANT: 
   - You must have an OpenAI account and API key for the similarity calculation to work. If you don't have one, sign up at https://openai.com/ and create an API key.
   - Keep your API key secret! Never commit your `.env.local` file to version control or share it publicly.
   - If you accidentally expose your API key, immediately revoke it and generate a new one from your OpenAI account dashboard.

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Deployment

To deploy Kontexti to a production environment, follow these steps:

1. Build the production-ready application:
   ```
   npm run build
   ```

2. Start the production server:
   ```
   npm start
   ```

For cloud deployment (e.g., Vercel, Netlify):

1. Connect your GitHub repository to your preferred cloud platform.
2. Configure the environment variables (OPENAI_API_KEY) in the platform's settings.
3. Deploy the application following the platform's deployment process.

Remember to keep your API keys and other sensitive information secure when deploying.

## How to Play

1. Try to guess the secret word of the day.
2. Enter a word and submit it to see how close you are.
3. The similarity score (0-100) and color-coded progress bar show how close your guess is to the secret word:
   - Red: Far from the target word
   - Yellow: Getting closer
   - Green: Very close or correct
4. Use hints if you're stuck (max 3 per game). Each hint reduces your final score.
5. Keep guessing until you find the exact word or choose to give up.
6. Your total score is calculated based on the number of attempts and hints used.
7. Click on the game title to reset to the current day's word.
8. Play past words from the archive to practice more!

## Contributing

Contributions to Kontexti are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Troubleshooting

- If you encounter any issues with the similarity calculation, make sure your OpenAI API key is correctly set in the `.env.local` file and that you have sufficient credits in your OpenAI account.
- If the game is not saving progress or seems to reset unexpectedly, check that your browser allows local storage for the site.
- For any other issues, please check the browser console for error messages and report them in the GitHub issues section of this repository.

## Security Note

Never share your OpenAI API key or commit it to version control. The `.env.local` file is included in `.gitignore` to prevent accidental commits. If you believe your API key has been exposed, revoke it immediately from your OpenAI account and generate a new one.

IMPORTANT: If you've cloned this repository before [DATE], please generate a new OpenAI API key, as the previous one was accidentally exposed and has been revoked.
