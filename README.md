# Kontexti - Word Guessing Game

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNeonize%2Fkontexti&env=JINA_API_KEY&envDescription=API%20key%20for%20similarity%20calculation%20via%20Jina.ai&envLink=https%3A%2F%2Fjina.ai%2F%23apiform&demo-title=Kontexti&demo-description=Find%20the%20semantically%20nearest%20word%20&demo-url=https%3A%2F%2Fkontexti.vmartens.de&demo-image=https%3A%2F%2Fgithub.com%2FNeonize%2Fkontexti%2Fblob%2Fmain%2FGameView.png%3Fraw%3Dtrue)

Kontexti is a daily word guessing game where players attempt to guess a secret word by entering semantically similar words. The game provides similarity scores based on the semantic proximity of the guessed words to the secret word, using JINA.ai's text embedding model.

## AI RESEARCH PROJECT

This project was mainly created with the use of <https://github.com/saoudrizwan/claude-dev>. You can see each request in the git history. Manual tasks are prefixed. Main problem was the daily rate limit. It took 5 days in total and a cost of under 6 $.
While 5 days sound much, the complete time might have been around 6 hours and most of it waiting thanks to the bad internet in german trains. Case in point, a `npm install` while writting this sentence took over 30 minutes...
Without rate limits and with good internet the project may could have been finished in under 3 hours.

### Steps took

1. Think about a game idea. I took reference from <https://contexto.me/> and wanted to try it with embeddings.
2. I wrote with ChatGPT to get a game plan to build this app. You can see the result in [GameIdea.md](/GameIdea.md).
3. Setup the project with shadcn and nextjs via `npx shadcn@latest init`. [More information](https://ui.shadcn.com/docs/installation/next)
4. Add components you think you might need via `npx shadcn@latest add` and install packages.
5. Let Claude-dev write the code

## Features

- Daily word generation
- Word input and evaluation based on semantic similarity using JINA embeddings
- Attempt history with similarity scores
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
- API Integration: JINA AI API for text embeddings (server-side only)

## Getting Started

To run the Kontexti game locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/neonize/kontexti.git
   cd kontexti
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your JINA API key:

   ```bash
   JINA_API_KEY=your_api_key_here
   ```

   IMPORTANT:
   - You must have an JINA API key for the similarity calculation to work. If you don't have one, create one at <https://jina.ai/#apiform> for free.
   - The API key is only used server-side in the API route, ensuring it's not exposed to the client.
   - Keep your API key secret! Never commit your `.env.local` file to version control or share it publicly.
   - If you accidentally expose your API key, immediately revoke it and generate a new one!

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Verifying the Setup

Either test the app on `http://localhost:3000` or use the following steps to only test the backend:

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
   - Ensure your JINA_API_KEY is correctly set in the .env.local file.
   - Check the server logs for any error messages.
   - Verify that your JINA.ai key has sufficient credits.

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
Please provide information if you have used any AI tools!

## License

This project is open source and available under the [MIT License](LICENSE).

## Troubleshooting

- If you encounter any issues with the similarity calculation, make sure your JINA API key is correctly set in the `.env.local` file and that you have sufficient credits left.
- If the game is not saving progress or seems to reset unexpectedly, check that your browser allows local storage for the site.
- For any other issues, please check the browser console for error messages and report them in the GitHub issues section of this repository.
