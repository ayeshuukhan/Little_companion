import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getVoices, sortVoicesForPicker } from "../services/voices";
import { textToSpeech } from "../services/textToSpeech";
import { useProfile } from "../context/ProfileContext";
import { AmbientBackground } from "./AmbientBackground";


type Step = "welcome" | "voice" | "name";

const SAMPLE_LINE = "Hi, I'm so glad you're here. I'm listening, whenever you're ready.";

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const { updateProfile } = useProfile();
  const [step, setStep] = useState<Step>("welcome");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    if (step !== "voice") return;
    let cancelled = false;
    getVoices().then((v) => {
      if (cancelled) return;
      const sorted = sortVoicesForPicker(v);
      setVoices(sorted);
      if (sorted.length > 0) setSelectedVoice(sorted[0].voiceURI);
    });
    return () => {
      cancelled = true;
    };
  }, [step]);

  function previewVoice(voiceURI: string) {
    setSelectedVoice(voiceURI);
    void textToSpeech.speak(SAMPLE_LINE, { voiceURI, rate: 1, pitch: 1.1 });
  }

  function finish() {
    updateProfile({
      onboarded: true,
      voiceURI: selectedVoice,
      name: name.trim() || "friend",
    });
    onComplete();
  }

  return (
    // <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-dusk-950 px-6">
          <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-6">
      <AmbientBackground />

      <AnimatePresence mode="wait">
        {step === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 flex max-w-md flex-col items-center gap-6 text-center"
          >
            <span className="text-4xl">🌙</span>
            <h1 className="font-display text-3xl font-medium text-white sm:text-4xl">
              A little space, just for you
            </h1>
            <p className="font-body text-white/60">
              Write down whatever's on your mind. I'll be here, listening,
              and I'll react to how you're feeling.
            </p>
            <button
              onClick={() => setStep("voice")}
              className="mt-2 rounded-full bg-gradient-to-r from-ember-500 to-bloom-600 px-8 py-3 font-body text-white shadow-lg shadow-ember-500/20 transition-transform hover:scale-[1.03]"
            >
              Begin
            </button>
          </motion.div>
        )}

        {step === "voice" && (
          <motion.div
            key="voice"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 flex w-full max-w-md flex-col items-center gap-6 text-center"
          >
            <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">
              Pick a voice for me
            </h2>
            <p className="font-body text-sm text-white/50">
              Tap one to hear it. You can change this anytime in Settings.
            </p>

            {voices.length === 0 ? (
              <p className="font-body text-sm text-white/40">
                Your browser didn't offer any voices — that's okay, I'll use
                its default one.
              </p>
            ) : (
              <div className="max-h-64 w-full space-y-2 overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.03] p-2">
                {voices.slice(0, 12).map((v) => (
                  <button
                    key={v.voiceURI}
                    onClick={() => previewVoice(v.voiceURI)}
                    className={`w-full rounded-xl px-4 py-2.5 text-left font-body text-sm transition-colors ${
                      selectedVoice === v.voiceURI
                        ? "bg-bloom-600/30 text-white"
                        : "text-white/70 hover:bg-white/5"
                    }`}
                  >
                    {v.name}
                    <span className="ml-2 text-xs text-white/40">{v.lang}</span>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => setStep("name")}
              className="mt-2 rounded-full bg-gradient-to-r from-ember-500 to-bloom-600 px-8 py-3 font-body text-white shadow-lg shadow-ember-500/20 transition-transform hover:scale-[1.03]"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === "name" && (
          <motion.div
            key="name"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 flex w-full max-w-md flex-col items-center gap-6 text-center"
          >
            <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">
              What should I call you?
            </h2>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name, or a nickname..."
              onKeyDown={(e) => e.key === "Enter" && finish()}
              className="w-full rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-center font-body text-white placeholder:text-white/35 focus:border-ember-500/40 focus:outline-none"
            />
            <button
              onClick={finish}
              className="mt-2 rounded-full bg-gradient-to-r from-ember-500 to-bloom-600 px-8 py-3 font-body text-white shadow-lg shadow-ember-500/20 transition-transform hover:scale-[1.03]"
            >
              Take me in
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
