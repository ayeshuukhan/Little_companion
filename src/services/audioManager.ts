// audioManager.ts
//
// Plays and layers the short sound-effect clips referenced in
// src/data/responses.ts. Fails silently (never throws into the UI) if a
// clip is missing, so the app still works before real audio assets are
// dropped into /public/audio.

const cache = new Map<string, HTMLAudioElement>();

function getAudio(src: string): HTMLAudioElement {
  let audio = cache.get(src);
  if (!audio) {
    audio = new Audio(src);
    audio.preload = "auto";
    cache.set(src, audio);
  }
  return audio;
}

/**
 * Play one or more clips together (layered), each at a modest volume so
 * they don't overpower the spoken response. Errors (e.g. a missing file)
 * are swallowed — sound is a nice-to-have, not a blocker.
 */
export function playLayered(sources: string[], volume = 0.55): void {
  for (const src of sources) {
    try {
      const audio = getAudio(src);
      audio.currentTime = 0;
      audio.volume = volume;
      void audio.play().catch(() => {
        // Missing asset or autoplay restriction — ignore.
      });
    } catch {
      // Ignore playback errors entirely.
    }
  }
}

export function stopAll(): void {
  for (const audio of cache.values()) {
    audio.pause();
    audio.currentTime = 0;
  }
}
