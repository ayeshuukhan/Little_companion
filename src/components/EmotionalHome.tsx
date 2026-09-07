import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WritingBox } from "./WritingBox";
import { UserMessage } from "./UserMessage";
import { ProcessingState } from "./ProcessingState";
import { HappyReaction } from "./HappyReaction";
import { SadReaction } from "./SadReaction";
import { detectEmotion, Emotion } from "../services/emotionDetector";
import { textToSpeech } from "../services/textToSpeech";
import { playLayered } from "../services/audioManager";
import { WindowFrame } from "./WindowFrame";
import { Companion } from "./Companion";
import { addMoment } from "../services/moments";
import { copy, pickVariant, ReactionLine, sections, Mood, responses } from "../data/responses";
import { useProfile } from "../context/ProfileContext";

type InterfaceState = "idle" | "processing" | "happy_reaction" | "sad_reaction" | "error";

// export function EmotionalHome({ onOpenSection }: { onOpenSection: (mood: Mood) => void }) {
export function EmotionalHome({
  onOpenSection,
  onOpenMoments,
}: {
  onOpenSection: (mood: Mood) => void;
  onOpenMoments: () => void;
}) {
  const { profile } = useProfile();
  const [state, setState] = useState<InterfaceState>("idle");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [line, setLine] = useState<ReactionLine | null>(null);

  const handleSubmit = useCallback(
    async (text: string) => {
      setError(null);
      setMessage(text);
      setState("processing");

      let emotion: Emotion;
      try {
        emotion = await detectEmotion(text);
      } catch {
        setState("error");
        setError(copy.errorClassifier);
        return;
      }

      if (emotion === "neutral") {
        setState("error");
        setError(copy.errorClassifier);
        return;
      }

      // const mood = emotion; // "happy" | "sad"
      // const chosen = pickVariant(mood);
      // setLine(chosen);
      const mood = emotion; // "happy" | "sad"
      const chosen = pickVariant(mood);
      addMoment(mood, text, chosen.spoken, chosen.written);
      setLine(chosen);
      setState(mood === "happy" ? "happy_reaction" : "sad_reaction");

      const moodData = responses[mood];
      if (profile.soundEnabled) playLayered(moodData.sounds);
      // void textToSpeech.speak(chosen.spoken, { ...moodData.voice, voiceURI: profile.voiceURI });

      // void textToSpeech.speak(chosen.spoken, { ...moodData.voice, voiceURI: profile.voiceURI, language: chosen.language });
      void textToSpeech.speak(chosen.spoken, {
      ...moodData.voice,
      voiceURI: profile.voiceURI,
      });




    },
    [profile.soundEnabled, profile.voiceURI]
  );

  const handleWriteAgain = useCallback(() => {
    textToSpeech.cancel();
    setMessage("");
    setError(null);
    setLine(null);
    setState("idle");
  }, []);

  const showReaction = state === "happy_reaction" || state === "sad_reaction";
  const mood: Mood | null = state === "happy_reaction" ? "happy" : state === "sad_reaction" ? "sad" : null;

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-8 px-6">
      <motion.h1
        layout
        className="text-center font-display text-4xl font-medium tracking-tight text-white sm:text-5xl"
      >
        {profile.name && profile.name !== "friend" ? `I'm listening, ${profile.name}...` : copy.idleTitle}

              </motion.h1>

      <p className="-mt-4 text-center font-body text-sm text-white/50">
        Tell me what's on your mind.
      </p>

      <Companion
        mood={
          state === "processing"
            ? "processing"
            : state === "happy_reaction"
            ? "happy"
            : state === "sad_reaction"
            ? "sad"
            : "idle"
        }
        size={110}
      />

      {message && (state === "processing" || showReaction || state === "error") && (
        <UserMessage text={message} />
      )}
      

      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div key="writing" exit={{ opacity: 0, y: -8 }} className="w-full">
            <WindowFrame label="companion">
              <WritingBox onSubmit={handleSubmit} />
            </WindowFrame>
          </motion.div>
        )}

        {state === "processing" && (
          <motion.div key="processing" className="py-4">
            <ProcessingState />
          </motion.div>
        )}

        {state === "happy_reaction" && line && (
          <motion.div key="happy" className="w-full">
            <HappyReaction line={line} />
          </motion.div>
        )}

        {state === "sad_reaction" && line && (
          <motion.div key="sad" className="w-full">
            <SadReaction line={line} />
          </motion.div>
        )}

        {state === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4 py-4 text-center"
          >
            <p className="font-body text-white/70">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {(showReaction || state === "error") && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <motion.button
            onClick={handleWriteAgain}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-white/15 px-6 py-2.5 font-body text-sm text-white/70 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
          >
            {copy.againLabel}
          </motion.button>

          {mood && (
            <motion.button
              onClick={() => onOpenSection(mood)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-white/15 px-6 py-2.5 font-body text-sm text-white/70 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
            >
              Go to {sections[mood].name} →
            </motion.button>
          )}
        </div>
      )}

      {/* {state === "idle" && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onOpenSection("happy")}
            className="rounded-full px-4 py-1.5 font-body text-xs text-white/40 transition-colors hover:text-ember-400"
          >
            {sections.happy.name}
          </button>
          <span className="text-white/20">·</span>
          <button
            onClick={() => onOpenSection("sad")}
            className="rounded-full px-4 py-1.5 font-body text-xs text-white/40 transition-colors hover:text-hush-300"
          >
            {sections.sad.name}
          </button>
        </div>
      )} */}
          {state === "idle" && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onOpenSection("happy")}
            className="rounded-full px-4 py-1.5 font-body text-xs text-white/40 transition-colors hover:text-ember-400"
          >
            {sections.happy.name}
          </button>
          <span className="text-white/20">·</span>
          <button
            onClick={() => onOpenSection("sad")}
            className="rounded-full px-4 py-1.5 font-body text-xs text-white/40 transition-colors hover:text-hush-300"
          >
            {sections.sad.name}
          </button>
          <span className="text-white/20">·</span>
          <button
            onClick={onOpenMoments}
            className="rounded-full px-4 py-1.5 font-body text-xs text-white/40 transition-colors hover:text-bloom-400"
          >
            ✦ Your Moments
          </button>
        </div>
      )}

    </div>
  );
}
