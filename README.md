## Little Companion

Little Companion is a simple writing app where users can write whatever they feel or think about. The app reads the message and tries to understand if the user is feeling happy, sad, or neutral.

After checking the emotion, the app shows a reaction with animations, sound effects, a spoken line, and a written response. The response is already written in the code, so the app does not chat with the user like a chatbot.

The main idea is pretty simple:

**User writes something → AI checks the emotion → App shows a reaction**

## How to Run the Project

### 1. Install the dependencies

Open the project folder in your terminal and run:

```bash
npm install
```

This will install all the packages needed to run the app.

### 2. Add your Anthropic API key

To use the real AI classifier, you need an API key from Anthropic.

- Go to https://console.anthropic.com/settings/keys
- Create your API key.
- Copy the `.env.example` file and rename the copy to `.env`.
- Add your key like this:

```env
ANTHROPIC_API_KEY= (Put your key here)
```

Keep your API key inside the `.env` file. Don't put it in your frontend code because other people could access it.

### 3. Start the app

Run this command:

```bash
npm run dev
```

This starts both the backend server and the frontend app. The backend runs on port 3001 and the frontend runs on port 5173.

Open this link in your browser:

`http://localhost:5173/`

If you don't have an API key yet, thats fine too. The app can still run with a basic offline classifier. It wont understand every message perfectly, but it works for simple cases.

## Project Folder Structure

Here is a quick look at the main files and what they do.

```text
server/
  index.js
```

This file handles the backend part. It sends the user's text to the AI model and gets back an emotion result. The API key stays on the server.

```text
src/
  components/
    EmotionalHome.tsx
    WritingBox.tsx
    UserMessage.tsx
    ProcessingState.tsx
    HappyReaction.tsx
    SadReaction.tsx
    Fireworks.tsx
    HugAnimation.tsx
    Onboarding.tsx
    Settings.tsx
    JournalSection.tsx
    StarField.tsx
    CosmicBackdrop.tsx
    WindowFrame.tsx

  services/
    emotionDetector.ts
    textToSpeech.ts
    audioManager.ts
    voices.ts
    storage.ts

  context/
    ProfileContext.tsx

  data/
    responses.ts

public/
  audio/
```

The components folder contains the main screens and visual parts of the app. For example, `WritingBox.tsx` is where the user types a message, and `HappyReaction.tsx` and `SadReaction.tsx` handle the reactions.

The services folder contains the logic for detecting emotions, playing sounds, speaking text, and saving user data.

The `responses.ts` file stores the written responses, spoken lines, affirmations, and theme related data.

## How Emotion Detection Works

The app uses two ways to check the user's emotion.

### 1. AI based classification

Normally, the app sends the user's message to the backend server. The server then calls the Anthropic API using the Claude Haiku 4.5 model.

The AI checks the full message and decides which category fits best:

- **Happy** – when the message sounds positive or joyful.
- **Sad** – when the message sounds sad or emotionally low.
- **Neutral** – when the message does not clearly fit either category.

It tries to understand the meaning of the whole message, not just a few words. For example, if someone starts their message feeling sad but ends it on a positive note, the AI can consider the full context.

### 2. Offline classification

If the server is not available, the API key is missing, or the request fails, the app uses a local classifier instead.

This classifier checks words and punctuation to make a basic guess about the emotion. It is not as smart as the real AI, but it helps the app keep working without an API connection.

You may see a warning in the console when the app switches to the offline mode. Thats normal if you haven't configured the API key.

## New Features

### Different responses every time

The app has 12 response options for happy emotions and 12 for sad emotions. These are stored in `src/data/responses.ts`.

Each response contains two parts:

- `spoken` – the line that the app says out loud.
- `written` – the text shown on the screen.

The app picks one of the available responses randomly, so users don't get the exact same line every time.

You can easily add your own lines or change the existing ones in `responses.ts`.

### Personal Journals

The app includes two small journal sections.

**Golden Moments** is for saving happy memories or things that made the user feel good.

**Let It Out** is for writing down feelings or things that are bothering the user.

Journal entries are saved in the browser using `localStorage`. They are not sent to the AI classifier, because journaling is meant to be a personal space.

Whenever a user saves an entry, the app also speaks a short affirmation. These lines are stored in `responses.ts`.

Users can also delete their saved entries whenever they want.

### First Time Setup

When someone opens the app for the first time, they see a welcome screen.

After that, they can choose a voice and preview how it sounds. Then they choose a name that the app will use when talking to them.

These settings are saved in the browser, so the user doesn't need to set everything up again next time.

### Settings

There is a settings button in the top right corner of the app.

From there, users can:

- Change their name.
- Select a different voice.
- Switch between Dusk, Sunrise, and Midnight themes.
- Turn sound effects on or off.

This makes the app a bit more personal and lets users adjust it to their own preference.

## Changing the AI Model or Prompt

If you want to change how the AI detects emotions, open `server/index.js`.

There are two main things you can edit:

- **MODEL**
- **System prompt**

For example, you can change the prompt to handle sarcasm differently or make it more strict when deciding between happy and sad.

If you add more emotion categories, remember to update the `VALID` set, the `Emotion` type in `emotionDetector.ts`, and the matching responses in `responses.ts`. Otherwise, the app may not handle the new category properly.

You can also use another AI provider instead of Anthropic. You only need to change the API request in the backend, as long as it still returns an emotion in the expected format.

## Changing the Voice

The app uses the browser's built-in Speech Synthesis API to read text out loud.

The `textToSpeech.ts` file handles the speech functions, such as speaking a line, stopping the current speech, and checking if speech is available.

If you want to use a different voice provider in the future, you can create a new provider with the same functions and replace the current one. The rest of the app should not need many changes.

## Design and Appearance

The app has a soft, space inspired design. It uses different colours and animations depending on the user's emotion.

- **Dusk theme:** dark plum and charcoal colours for the normal screen.
- **Happy reaction:** warm coral and golden colours, with fireworks and celebration effects.
- **Sad reaction:** soft lavender and indigo colours, with a gentle hug animation.

The app also uses three different fonts:

- Fraunces for large headings.
- Inter for normal text.
- Caveat for spoken lines and quotes.

One of the main design features is the glowing effect behind the writing box. It slowly moves when the app is idle, turns into fireworks for happy reactions, and shows soft moving rings for sad reactions.

The app also supports the `prefers-reduced-motion` setting, so animations can be reduced for users who prefer less movement.
