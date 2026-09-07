# Audio assets

Drop short, royalty-free (or original) clips here with these exact names —
`src/data/responses.ts` already points at them:

```
happy-fireworks.mp3
happy-giggle.mp3
sad-comfort.mp3
sad-hug-chime.mp3
```

The app runs fine with this folder empty: `audioManager.ts` swallows
missing-file errors so playback failures never break the UI. Add the files
whenever you're ready and they'll start playing automatically — no code
changes needed.

Keep clips short (under ~2s) and quiet enough that they sit underneath the
spoken TTS line rather than competing with it.
