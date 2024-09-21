# Kontexti - Word Guessing Game

Kontexti is a daily word guessing game where players attempt to guess a secret word by entering semantically similar words. The game provides similarity scores based on the semantic proximity of the guessed words to the secret word, using OpenAI's text embedding model.

## Features

- Daily word generation
- Word input and evaluation based on semantic similarity using OpenAI embeddings
- Color-coded attempt history with similarity scores
- Hint system (3 hints per game) with past hints display
- Progress saving using local storage
- Archive of past words for continuous play
- Dark mode support (follows system preference)
- Responsive design for various screen sizes
- Total points calculation based on attempts and hints used
- Loading states for better user experience

## Technology Stack

- Frontend: Next.js 14 with TypeScript
- Backend: Next.js API Routes
- UI: shadcn components and Tailwind CSS
- State Management: React Hooks
- Animations: Framer Motion
- API Integration: OpenAI API for text embeddings (server-side only)

## Getting Started

To run the Kontexti game locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/kontexti.git
   cd kontexti
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your OpenAI API key:

   ```bash
   OPENAI_API_KEY=your_api_key_here
   ```

   IMPORTANT:
   - You must have an OpenAI account and API key for the similarity calculation to work. If you don't have one, sign up at <https://openai.com/> and create an API key.
   - The API key is only used server-side in the API route, ensuring it's not exposed to the client.
   - Keep your API key secret! Never commit your `.env.local` file to version control or share it publicly.
   - If you accidentally expose your API key, immediately revoke it and generate a new one from your OpenAI account dashboard.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Verifying the Setup

To ensure that your setup is working correctly, especially the API endpoint for similarity calculation:

1. Start the development server if it's not already running.
2. Open a new terminal window and use curl (or any API testing tool) to send a POST request to the similarity calculation endpoint:

   ```bash
   curl -X POST http://localhost:3000/api/calculate-similarity \
   -H "Content-Type: application/json" \
   -d '{"input":"apple", "target":"fruit"}'
   ```

3. You should receive a JSON response with a similarity score. For example:

   ```bash
   {"score": 76}
   ```

4. If you receive an error or no response, check the following:
   - Ensure your OPENAI_API_KEY is correctly set in the .env.local file.
   - Check the server logs for any error messages.
   - Verify that your OpenAI account has sufficient credits.

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

Never share your OpenAI API key or commit it to version control. The `.env.local` file is included in `.gitignore` to prevent accidental commits. The API key is only used server-side, ensuring it's not exposed to the client. If you believe your API key has been exposed, revoke it immediately from your OpenAI account and generate a new one.
