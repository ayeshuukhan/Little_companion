import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mood, sections, pickAffirmation } from "../data/responses";
import { JournalEntry, loadJournal, addJournalEntry, deleteJournalEntry } from "../services/storage";
import { textToSpeech } from "../services/textToSpeech";
import { useProfile } from "../context/ProfileContext";

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function JournalSection({ mood, onBack }: { mood: Mood; onBack: () => void }) {
  const config = sections[mood];
  const { profile } = useProfile();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [draft, setDraft] = useState("");
  const [affirmation, setAffirmation] = useState<string | null>(null);

  useEffect(() => {
    setEntries(loadJournal(mood));
    setAffirmation(null);
  }, [mood]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    const next = addJournalEntry(mood, text);
    setEntries(next);
    setDraft("");

    const line = pickAffirmation(mood);
    setAffirmation(line);
    void textToSpeech.speak(line, { ...config.voice, voiceURI: profile.voiceURI });
  }

  function handleDelete(id: string) {
    setEntries(deleteJournalEntry(mood, id));
  }

  const accent = mood === "happy" ? "text-ember-400" : "text-hush-300";
  const accentBorder = mood === "happy" ? "focus-within:border-ember-500/40" : "focus-within:border-hush-400/40";
  const accentBtn =
    mood === "happy"
      ? "from-ember-500 to-bloom-600 shadow-ember-500/20"
      : "from-hush-500 to-bloom-600 shadow-hush-500/20";

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-6 px-6">
      <button
        onClick={onBack}
        className="self-start font-body text-sm text-white/50 transition-colors hover:text-white"
      >
        ← back
      </button>

      <div className="text-center">
        <h1 className={`font-display text-3xl font-medium ${accent}`}>{config.name}</h1>
        <p className="mt-1 font-body text-sm text-white/50">{config.tagline}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-3">
        <div
          className={`w-full rounded-3xl border border-white/10 bg-white/[0.04] p-1 backdrop-blur-xl transition-colors ${accentBorder}`}
        >
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={config.placeholder}
            rows={3}
            className="w-full resize-none rounded-[20px] bg-transparent px-5 py-4 font-body text-base text-white/90 placeholder:text-white/35 focus:outline-none"
          />
        </div>
        <motion.button
          type="submit"
          disabled={!draft.trim()}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`rounded-full bg-gradient-to-r ${accentBtn} px-7 py-2.5 font-body text-sm font-medium text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-40`}
        >
          {config.buttonLabel}
        </motion.button>
      </form>

      <AnimatePresence>
        {affirmation && (
          <motion.p
            key={affirmation}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`font-script text-2xl ${accent}`}
          >
            {affirmation}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="w-full space-y-2 pb-8">
        {entries.length === 0 && (
          <p className="py-6 text-center font-body text-sm text-white/35">{config.emptyState}</p>
        )}
        <AnimatePresence initial={false}>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-body text-xs text-white/35">{formatDate(entry.createdAt)}</span>
                <button
                  onClick={() => handleDelete(entry.id)}
                  aria-label="Delete entry"
                  className="rounded-full p-1 text-white/30 transition-colors hover:bg-white/10 hover:text-white/80"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  </svg>
                </button>
              </div>
              <p className="mt-1 font-body text-sm text-white/80">{entry.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
