// voices.ts
//
// Browsers load speechSynthesis voices asynchronously and inconsistently
// (some fire "voiceschanged", some already have them ready). This helper
// papers over that so the Onboarding voice-picker gets a reliable list.

export function getVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve([]);
      return;
    }

    const existing = window.speechSynthesis.getVoices();
    if (existing.length > 0) {
      resolve(existing);
      return;
    }

    const handle = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        window.speechSynthesis.removeEventListener("voiceschanged", handle);
        resolve(voices);
      }
    };

    window.speechSynthesis.addEventListener("voiceschanged", handle);

    // Fallback in case the event never fires on this browser.
    window.setTimeout(() => {
      window.speechSynthesis.removeEventListener("voiceschanged", handle);
      resolve(window.speechSynthesis.getVoices());
    }, 1200);
  });
}

/** English voices first, then everything else — keeps the picker short and relevant. */
export function sortVoicesForPicker(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  return [...voices].sort((a, b) => {
    const aEn = a.lang.toLowerCase().startsWith("en") ? 0 : 1;
    const bEn = b.lang.toLowerCase().startsWith("en") ? 0 : 1;
    if (aEn !== bEn) return aEn - bEn;
    return a.name.localeCompare(b.name);
  });
}
