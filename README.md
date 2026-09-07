# little companion — an emotion-reactive writing space

You write what's on your mind. The app decides — with exactly one small,
swappable AI step — whether it feels happy or sad, then reacts with
animation, sound, a spoken line, and a written response. Everything past
the classification is deterministic and hard-coded; there's no chatbot and
no conversation.

```
USER WRITES → AI CLASSIFIES (happy | sad | neutral) → UI REACTS
```

## Run it

**1. Install dependencies**
```bash
npm install
```

**2. Add your Anthropic API key** (this is what gives the app real
understanding instead of keyword guessing)

- Get a key at https://console.anthropic.com/settings/keys
- Copy `.env.example` to a new file named `.env` in the project root
- Paste your key in:
  ```
  ANTHROPIC_API_KEY=sk-ant-your-real-key-here
  ```

**3. Start it**
```bash
npm run dev
```
This starts both the classifier backend (port 3001) and the app (port
5173) together. Open the printed `http://localhost:5173/` link.

No key yet, or don't want to set one up? The app still runs —
`npm run dev` works with no `.env` at all, it just falls back to a
simple offline keyword classifier (see "How classification works" below).

## Project layout

```
server/
  index.js              tiny backend: receives text, asks a real model to
                          classify it, returns { emotion }. Your API key
                          lives only here, never in the browser.

src/
  components/
    EmotionalHome.tsx   the interface state machine (idle → processing → reaction)
    WritingBox.tsx       the text input + "Tell me" button
    UserMessage.tsx       displays what the user wrote, stays visible throughout
    ProcessingState.tsx   the brief "Hmm... I got you." beat
    HappyReaction.tsx     fireworks + a randomly-picked celebration line
    SadReaction.tsx        hug animation + a randomly-picked comfort line
    Fireworks.tsx           particle burst visual
    HugAnimation.tsx        soft converging-arcs comfort visual
    Onboarding.tsx          first-visit flow: welcome → pick a voice → pick a name
    Settings.tsx             gear-icon modal: edit name, voice, theme, sound toggle
    JournalSection.tsx      "Golden Moments" / "Let It Out" personal logs
    StarField.tsx             twinkling star background
    CosmicBackdrop.tsx        nebula glow + drifting planets
    WindowFrame.tsx            glassy browser-chrome card wrapper

  services/
    emotionDetector.ts   the ONE AI responsibility: classify text as happy/sad/neutral
    textToSpeech.ts        speaks lines via the browser's SpeechSynthesis API
    audioManager.ts        layers/plays the short sound-effect clips
    voices.ts                lists available browser TTS voices for the pickers
    storage.ts               localStorage: profile (name/voice/theme) + journal entries

  context/
    ProfileContext.tsx    shares the loaded profile across the app

  data/
    responses.ts          every spoken/written line, affirmation, and theme lives here

public/audio/            drop your .mp3 clips here (see public/audio/README.md)
```

## How classification works

`src/services/emotionDetector.ts` tries two layers, in order:

1. **Real model (default).** Sends the text to `server/index.js`, which
   calls the Anthropic API with a small, fast model (`claude-haiku-4-5`)
   and a prompt that asks it to judge the *whole message's* tone —
   including sarcasm, mixed signals, and longer, less keyword-y writing —
   not just spot individual words. This is what fixes cases the old
   keyword approach missed, like a message that starts sad and turns
   around by the end.
2. **Local fallback.** If the server isn't running, has no API key, or
   the request fails for any reason, it silently falls back to
   `localHeuristicClassifier` — a dependency-free keyword/punctuation
   scorer — so the app never breaks, it just gets less nuanced.

You'll see a console warning (`Remote classifier unavailable...`) when
the fallback kicks in — that's expected if you haven't set up `.env` yet.

## What's new: variety, journals, and a first-run flow

- **No more identical repeats.** Each mood now has 12 spoken/written pairs
  in `src/data/responses.ts` (`responses.happy.variants` /
  `responses.sad.variants`); one is picked at random per reaction via
  `pickVariant()`. Add, remove, or edit lines there — every line is a
  `{ spoken, written }` pair.

- **Golden Moments (happy) and Let It Out (sad).** Two personal journals,
  reachable from small links under the writing box or from a "Go to ⟶"
  button after a reaction. Writing an entry there is *not* run through the
  emotion classifier — it's a private log, not a message — and every save
  triggers a short spoken affirmation picked at random from
  `sections.happy.affirmations` / `sections.sad.affirmations` in
  `responses.ts`. Entries persist in `localStorage` and each has a small
  trash icon to delete it.

- **First-visit onboarding.** New users see a calm welcome screen, then
  pick a voice (with a live preview), then choose what the app should call
  them. This is saved to `localStorage` so it only happens once per
  browser.

- **Settings (gear icon, top right).** Change your name, voice, theme
  (Dusk / Sunrise / Midnight), and toggle sound effects at any time.

## Changing the classifier prompt or model

Both live in `server/index.js`:
- `MODEL` — currently `claude-haiku-4-5-20251001` (fast, cheap, plenty
  accurate for a 3-way classification).
- The `system` prompt — tune this if you want it to weigh things
  differently (e.g. stricter about sarcasm, or adding more emotion
  categories — just remember to update the `VALID` set too, and the
  `Emotion` type in `emotionDetector.ts`, and add matching entries in
  `responses.ts`).

Want to point at a different provider entirely instead of Anthropic?
Rewrite the `fetch` call inside the `/api/classify-emotion` route in
`server/index.js` — the frontend only cares that the endpoint returns
`{ emotion: "happy" | "sad" | "neutral" }`, so nothing else needs to change.

## Upgrading the voice

`textToSpeech.ts` wraps the browser's built-in `speechSynthesis` behind a
small `TextToSpeechProvider` interface. To use a hosted voice provider
later, implement the same interface (`speak`, `cancel`, `isAvailable`) and
swap the `textToSpeech` export — nothing else in the app needs to know.

## Design notes

- **Palette** shifts with mood: a dusk plum/charcoal base at idle, warm
  coral/gold for the happy reaction, and cool lavender/indigo for the sad
  one.
- **Type**: Fraunces (display) for the big emotional beats, Inter (body)
  for UI copy, and Caveat (script) for the spoken-line quote — it reads
  like something said aloud rather than a system message.
- **Signature element**: the breathing aura behind the writing box —
  it's alive at idle, bursts into fireworks on happy, and settles into
  slow converging rings on sad.
- Respects `prefers-reduced-motion`.
