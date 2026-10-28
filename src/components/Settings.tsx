import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getVoices, sortVoicesForPicker } from "../services/voices";
import { textToSpeech } from "../services/textToSpeech";
import { useProfile } from "../context/ProfileContext";
import { themes, characters } from "../data/responses";
import { Companion } from "./Companion";

const SAMPLE_LINE = "Hi, this is what I sound like.";

export function Settings({ onClose }: { onClose: () => void }) {
  const { profile, updateProfile } = useProfile();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [name, setName] = useState(profile.name);

  useEffect(() => {
    let cancelled = false;
    getVoices().then((v) => {
      if (!cancelled) setVoices(sortVoicesForPicker(v));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function previewVoice(voiceURI: string) {
    updateProfile({ voiceURI });
    void textToSpeech.speak(SAMPLE_LINE, { voiceURI, rate: 1, pitch: 1.1 });
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25 }}
          className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-white/10 bg-black/95 p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl text-white">Settings</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
                    <div>
            <label className="mb-2 block font-body text-sm text-white/60">Theme</label>
            <div className="grid grid-cols-4 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateProfile({ theme: t.id })}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center font-body text-xs leading-tight transition-colors ${
                    profile.theme === t.id
                      ? "border-ember-500/60 bg-ember-500/10 text-white"
                      : "border-white/10 text-white/60 hover:bg-white/5"
                  }`}
                >
                  <span
                    className="h-5 w-5 rounded-full"
                    style={{ backgroundColor: t.swatch, boxShadow: `0 0 12px ${t.swatch}` }}
                  />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block font-body text-sm text-white/60">Companion</label>
            <div className="grid grid-cols-3 gap-2">
              {characters.map((c) => (
                <button
                  key={c.id}
                  onClick={() => updateProfile({ character: c.id })}
                  className={`flex flex-col items-center rounded-xl border px-2 py-3 font-body text-xs transition-colors ${
                    profile.character === c.id
                      ? "border-ember-500/60 bg-ember-500/10 text-white"
                      : "border-white/10 text-white/60 hover:bg-white/5"
                  }`}
                >
                  <Companion mood="idle" size={64} character={c.id} />
                  <span className="mt-1">{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block font-body text-sm text-white/60">Voice</label>
            <div className="max-h-40 space-y-1.5 overflow-y-auto rounded-xl border border-white/10 bg-white/[0.03] p-2">
              {voices.length === 0 && (
                <p className="px-2 py-1 font-body text-xs text-white/40">
                  No voices found — using your browser's default.
                </p>
              )}
              {voices.slice(0, 10).map((v) => (
                <button
                  key={v.voiceURI}
                  onClick={() => previewVoice(v.voiceURI)}
                  className={`w-full rounded-lg px-3 py-2 text-left font-body text-sm transition-colors ${
                    profile.voiceURI === v.voiceURI
                      ? "bg-bloom-600/30 text-white"
                      : "text-white/70 hover:bg-white/5"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block font-body text-sm text-white/60">Theme</label>
            <div className="flex gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateProfile({ theme: t.id })}
                  className={`flex-1 rounded-xl border px-3 py-2 font-body text-sm transition-colors ${
                    profile.theme === t.id
                      ? "border-ember-500/60 bg-ember-500/10 text-white"
                      : "border-white/10 text-white/60 hover:bg-white/5"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="font-body text-sm text-white/60">Sound effects</label>
            <button
              onClick={() => updateProfile({ soundEnabled: !profile.soundEnabled })}
              className={`h-7 w-12 rounded-full transition-colors ${
                profile.soundEnabled ? "bg-ember-500" : "bg-white/15"
              }`}
              aria-pressed={profile.soundEnabled}
              aria-label="Toggle sound effects"
            >
              <motion.span
                className="block h-5 w-5 rounded-full bg-white"
                animate={{ x: profile.soundEnabled ? 22 : 4 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SettingsButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open settings"
      className="fixed right-5 top-5 z-40 rounded-full border border-white/10 bg-white/[0.04] p-2.5 text-white/60 backdrop-blur-md transition-colors hover:text-white"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    </button>
  );
}

export function SettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return <AnimatePresence>{open && <Settings onClose={onClose} />}</AnimatePresence>;
}
