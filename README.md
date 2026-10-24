## Little Companion

An AI-powered writing app that detects emotions (happy, sad, or neutral) and responds with pre-written messages, animations, sound effects, and speech.

### Features

- AI-based emotion detection using Claude Haiku 4.5
- Offline emotion classification fallback
- Animated emotional reactions
- Text-to-speech and sound effects
- Personal journals: Golden Moments and Let It Out
- Customizable voices, themes, and user settings
- Local storage for journal entries and preferences

### Tech Stack

- React, TypeScript, and Vite
- Node.js and Express
- Anthropic API
- Browser Speech Synthesis API
- LocalStorage

### Getting Started

#### 1. Install dependencies

```bash
npm install
```

#### 2. Configure environment variables

Copy `.env.example` to `.env` and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=(put your api here)
```

Keep your API key private. Never expose it in frontend code or commit your `.env` file.

The app can use offline emotion classification if the API key is unavailable.

#### 3. Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Project Structure

```text
server/       Backend and AI classification
src/
  components/ UI and emotional reactions
  services/   Emotion detection, speech, audio, storage
  context/    User profile context
  data/       Responses and affirmations
public/audio/ Sound effects
```

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
