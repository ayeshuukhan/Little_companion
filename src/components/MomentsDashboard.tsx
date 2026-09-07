import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moment, loadMoments, markMomentJournaled, deleteMoment } from "../services/moments";
import { addJournalEntry } from "../services/storage";
import { sections } from "../data/responses";

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function MomentsDashboard({ onBack }: { onBack: () => void }) {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [selected, setSelected] = useState<Moment | null>(null);

  useEffect(() => {
    setMoments(loadMoments());
  }, []);

  function handleSave(m: Moment) {
    addJournalEntry(m.mood, m.written);
    const next = markMomentJournaled(m.id);
    setMoments(next);
    setSelected((prev) => (prev && prev.id === m.id ? { ...prev, journaled: true } : prev));
  }

  function handleDelete(id: string) {
    setMoments(deleteMoment(id));
    setSelected(null);
  }

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-6 px-6">
      <button
        onClick={onBack}
        className="self-start font-body text-sm text-white/50 transition-colors hover:text-white"
      >
        ← back
      </button>

      <div className="text-center">
        <h1 className="font-display text-3xl font-medium text-white">Your Moments</h1>
        <p className="mt-1 font-body text-sm text-white/50">Everything you've told me, in one place.</p>
      </div>

      <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center">
        <p className="font-body text-sm text-white/60">
          <span className="text-happy-coral">Happy moments</span>, written down, become proof you can
          look back on when you doubt yourself.{" "}
          <span className="text-sad-dusty">Heavy moments</span>, written down, feel lighter — naming a
          feeling is often the first step to easing it.
        </p>
      </div>

      {moments.length === 0 ? (
        <p className="py-10 text-center font-body text-sm text-white/35">
          Nothing here yet — come back after you've told me something.
        </p>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <AnimatePresence>
            {moments.map((m) => (
              <motion.button
                key={m.id}
                layout
                onClick={() => setSelected(m)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`flex flex-col gap-2 rounded-2xl border px-5 py-4 text-left backdrop-blur-xl transition-colors ${
                  m.mood === "happy"
                    ? "border-happy-coral/20 bg-happy-coral/[0.05] hover:border-happy-coral/40"
                    : "border-sad-dusty/20 bg-sad-dusty/[0.05] hover:border-sad-dusty/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-body text-xs ${
                      m.mood === "happy" ? "text-happy-coral" : "text-sad-dusty"
                    }`}
                  >
                    {m.mood === "happy" ? "✦ Happy" : "☁ Heavy"}
                  </span>
                  <span className="font-body text-xs text-white/30">{formatDate(m.createdAt)}</span>
                </div>
                <p className="line-clamp-2 font-body text-sm text-white/80">"{m.query}"</p>
                <p className="line-clamp-2 font-body text-xs text-white/45">{m.written}</p>
                {m.journaled ? (
                  <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 font-body text-[11px] text-white/60">
                    ✓ Journaled
                  </span>
                ) : (
                  <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 font-body text-[11px] text-white/40">
                    Not saved yet
                  </span>
                )}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md rounded-3xl border border-white/10 bg-base-charcoal/95 p-6 shadow-2xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`font-body text-xs ${
                    selected.mood === "happy" ? "text-happy-coral" : "text-sad-dusty"
                  }`}
                >
                  {selected.mood === "happy" ? "✦ Happy moment" : "☁ Heavy moment"}
                </span>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <p className="mb-1 font-body text-xs text-white/35">You wrote</p>
              <p className="mb-4 font-body text-sm text-white/85">"{selected.query}"</p>

              <p className="mb-1 font-body text-xs text-white/35">I said</p>
              <p className="mb-1 font-script text-xl text-white/90">{selected.spoken}</p>
              <p className="mb-4 font-body text-sm text-white/60">{selected.written}</p>

              <p className="mb-4 font-body text-xs text-white/30">{formatDate(selected.createdAt)}</p>

              <div className="flex items-center justify-between gap-3">
                {selected.journaled ? (
                  <span className="font-body text-xs text-white/50">
                    ✓ Saved to {sections[selected.mood].name}
                  </span>
                ) : (
                  <button
                    onClick={() => handleSave(selected)}
                    className="rounded-full bg-gradient-to-r from-ember-500 to-bloom-600 px-5 py-2 font-body text-sm text-white"
                  >
                    Save to {sections[selected.mood].name}
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="font-body text-xs text-white/30 hover:text-white/60"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}