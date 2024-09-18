# Kontexti - Word Guessing Game

## Overview

Kontexti is a daily word guessing game where players attempt to guess a secret word by entering semantically similar words.

## Technology Stack

- Frontend: NextJs with TypeScript
- UI: shadcn and Tailwind CSS
- Embeddings: OpenAI API

## Core Features

### 1. Daily Word

- A new secret word is generated each day.
- The word remains the same for all players for 24 hours.

### 2. Word Input and Evaluation

- Players enter words to guess the secret word.
- Input is restricted to a single word without spaces or hyphens.
- Each input is compared as an embedding with the embedding of the secret word.
- A similarity score from 0 to 100 is calculated based on semantic proximity.
- A score of 100 reveals the secret word and ends the game.

### 3. Attempt History

- All previous attempts are displayed.
- The list is sorted in descending order by similarity score.
- The number of attempts is counted and displayed.

### 4. Progress Saving

- Game progress is saved in the browser's local storage.
- Allows players to continue the game later.

### 5. Assistance Functions

- "Hint" button: Provides the player with a clue to get closer to the target word.
- "Give up" button: Reveals the secret word and ends the game.

### 6. Archive of Past Words

- Previous secret words are kept available.
- Players can select and play with past words.
- Allows for continuous play without waiting 24 hours for a new word.

## Special Features

- Daily change of the secret word
- Use of embeddings for semantic similarity calculation
- Progress saving for uninterrupted gaming experience
- Access to an archive of past secret words
- Single word input restriction

## Language

- The game interface and explanations will be in English.
