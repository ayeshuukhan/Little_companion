

// textToSpeech.ts
//
// Speaks the app's HARD-CODED lines only — it never receives generated
// text. Built around the browser's SpeechSynthesis API for the MVP,
// but shaped as a small interface so a hosted voice provider can be
// dropped in later without touching any component.

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voiceURI?: string | null;
}

export interface TextToSpeechProvider {
  speak(text: string, options?: SpeakOptions): Promise<void>;
  cancel(): void;
  isAvailable(): boolean;
}

class BrowserTextToSpeech implements TextToSpeechProvider {
  isAvailable(): boolean {
    return (
      typeof window !== "undefined" &&
      "speechSynthesis" in window
    );
  }

  speak(
    text: string,
    options: SpeakOptions = {}
  ): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isAvailable()) {
        // Gracefully do nothing if TTS isn't supported.
        // The written response still appears.
        resolve();
        return;
      }

      const voices = window.speechSynthesis.getVoices();

      let selectedVoice: SpeechSynthesisVoice | undefined;

      // --------------------------------------------------
      // 1. Use the user's selected voice if available
      // --------------------------------------------------
      if (options.voiceURI) {
        selectedVoice = voices.find(
          (voice) => voice.voiceURI === options.voiceURI
        );
      }

      // --------------------------------------------------
      // 2. If no specific voice was selected,
      //    prefer an English voice.
      // --------------------------------------------------
      if (!selectedVoice) {
        selectedVoice = voices.find((voice) =>
          voice.lang.toLowerCase().startsWith("en")
        );
      }

      // --------------------------------------------------
      // 3. Split the response into separate sentences.
      // --------------------------------------------------
      const sentences =
        text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [text];

      let currentIndex = 0;

      // --------------------------------------------------
      // 4. Speak each sentence one after another.
      //    The first sentence starts slightly slower,
      //    then the speed gradually increases.
      // --------------------------------------------------
      const speakNext = () => {
        if (currentIndex >= sentences.length) {
          resolve();
          return;
        }

        const sentence = sentences[currentIndex].trim();

        if (!sentence) {
          currentIndex++;
          speakNext();
          return;
        }

        const utterance =
          new SpeechSynthesisUtterance(sentence);

        const baseRate = options.rate ?? 1;

        // Start at 90% of the normal speed.
        const startingRate = baseRate * 0.90;

        // End at the normal speed.
        const finalRate = baseRate;

        // Calculate how far through the response we are.
        const progress =
          sentences.length <= 1
            ? 1
            : currentIndex / (sentences.length - 1);

        // Gradually move from the slower rate
        // to the normal rate.
        utterance.rate =
          startingRate +
          (finalRate - startingRate) * progress;

        utterance.pitch = options.pitch ?? 1;
        utterance.volume = options.volume ?? 1;

        // Use the selected English voice.
        if (selectedVoice) {
          utterance.voice = selectedVoice;
          utterance.lang = selectedVoice.lang;
        }

        // When this sentence finishes,
        // automatically speak the next one.
        utterance.onend = () => {
          currentIndex++;
          speakNext();
        };

        // If something goes wrong with TTS,
        // don't break the whole application.
        utterance.onerror = () => {
          resolve();
        };

        window.speechSynthesis.speak(utterance);
      };

      // Stop any previous speech before starting new speech.
      window.speechSynthesis.cancel();

      speakNext();
    });
  }

  cancel(): void {
    if (this.isAvailable()) {
      window.speechSynthesis.cancel();
    }
  }
}

// This can later be replaced with another TTS provider,
// such as a hosted voice provider.
export const textToSpeech: TextToSpeechProvider =
  new BrowserTextToSpeech();




































































// // textToSpeech.ts
// //
// // Speaks the app's HARD-CODED lines only — it never receives generated
// // text. Built around the browser's SpeechSynthesis API for the MVP, but
// // shaped as a small interface so a hosted voice provider (e.g. ElevenLabs)
// // can be dropped in later without touching any component.

// // export interface SpeakOptions {
// //   rate?: number; // 0.1 - 10, 1 is normal
// //   pitch?: number; // 0 - 2, 1 is normal
// //   volume?: number; // 0 - 1
// //   voiceURI?: string | null; // picked in Onboarding / Settings, matched against speechSynthesis.getVoices()
// // }

// export interface SpeakOptions {
//   rate?: number;
//   pitch?: number;
//   volume?: number;
//   voiceURI?: string | null;
//   language?: "en" | "roman-urdu";
// }

// export interface TextToSpeechProvider {
//   speak(text: string, options?: SpeakOptions): Promise<void>;
//   cancel(): void;
//   isAvailable(): boolean;
// }

// class BrowserTextToSpeech implements TextToSpeechProvider {
//   isAvailable(): boolean {
//     return typeof window !== "undefined" && "speechSynthesis" in window;
//   }

//   speak(text: string, options: SpeakOptions = {}): Promise<void> {
//     return new Promise((resolve) => {
//       if (!this.isAvailable()) {
//         // Gracefully no-op if TTS isn't supported — the written response
//         // still renders, so nothing is lost.
//         resolve();
//         return;
//       }

//       // const utterance = new SpeechSynthesisUtterance(text);
//       // utterance.rate = options.rate ?? 1;
//       // utterance.pitch = options.pitch ?? 1;
//       // utterance.volume = options.volume ?? 1;

//       // if (options.voiceURI) {
//       //   const match = window.speechSynthesis
//       //     .getVoices()
//       //     .find((v) => v.voiceURI === options.voiceURI);
//       //   if (match) utterance.voice = match;
//       // }

//       const utterance = new SpeechSynthesisUtterance(text);

// utterance.rate = options.rate ?? 1;
// utterance.pitch = options.pitch ?? 1;
// utterance.volume = options.volume ?? 1;

// // If the user has selected a specific voice, use it first.
// if (options.voiceURI) {
//   const match = window.speechSynthesis
//     .getVoices()
//     .find((v) => v.voiceURI === options.voiceURI);

//   if (match) {
//     utterance.voice = match;
//   }
// }

// // Otherwise, choose a voice based on the response language.
// if (!options.voiceURI || !utterance.voice) {
//   const voices = window.speechSynthesis.getVoices();

//   if (options.language === "roman-urdu") {
//     // Roman Urdu is written in English/Latin letters,
//     // so we look for an Urdu voice available on the device/browser.
//     const urduVoice = voices.find((voice) =>
//       voice.lang.toLowerCase().startsWith("ur")
//     );

//     if (urduVoice) {
//       utterance.voice = urduVoice;
//       utterance.lang = urduVoice.lang;
//     }
//   } else if (options.language === "en") {
//     const englishVoice = voices.find((voice) =>
//       voice.lang.toLowerCase().startsWith("en")
//     );

//     if (englishVoice) {
//       utterance.voice = englishVoice;
//       utterance.lang = englishVoice.lang;
//     }
//   }
// }

//       const finish = () => resolve();
//       utterance.onend = finish;
//       utterance.onerror = finish;

//       // Some browsers need voices loaded async; speak regardless, browsers
//       // fall back to a default voice if the preferred one isn't ready.
//       window.speechSynthesis.cancel();
//       window.speechSynthesis.speak(utterance);
//     });
//   }

//   cancel(): void {
//     if (this.isAvailable()) window.speechSynthesis.cancel();
//   }
// }

// // Swap this export for another TextToSpeechProvider implementation
// // (e.g. a hosted-voice provider) to upgrade voice quality later.
// export const textToSpeech: TextToSpeechProvider = new BrowserTextToSpeech();
