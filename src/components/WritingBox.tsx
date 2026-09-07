import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { copy } from "../data/responses";

interface WritingBoxProps {
  onSubmit: (text: string) => void;
  disabled?: boolean;
  error?: string | null;
}

const MAX_LENGTH = 500;

export function WritingBox({ onSubmit, disabled, error }: WritingBoxProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSubmit(value.trim());
  }

  const count = value.length;
  const nearLimit = count > MAX_LENGTH * 0.85;

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center gap-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative w-full">
        {/* animated focus glow ring */}
        <AnimatePresence>
          {focused && (
            <motion.div
              className="pointer-events-none absolute -inset-1 rounded-[30px] bg-gradient-to-r from-ember-500/40 via-bloom-500/30 to-hush-400/30 blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        <div className="relative w-full rounded-[28px] border border-white/10 bg-white/[0.04] p-1 backdrop-blur-xl transition-colors">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, MAX_LENGTH))}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={copy.placeholder}
            rows={4}
            disabled={disabled}
            className="w-full resize-none rounded-[24px] bg-transparent px-5 py-4 font-body text-base text-white/90 placeholder:text-white/35 focus:outline-none disabled:opacity-50 sm:px-6 sm:py-5 sm:text-lg"
          />
          <div className="flex items-center justify-end px-5 pb-2 sm:px-6">
            <span
              className={`font-body text-xs transition-colors ${
                nearLimit ? "text-ember-400" : "text-white/25"
              }`}
            >
              {count}/{MAX_LENGTH}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <p className="font-body text-sm text-ember-400/90" role="alert">
          {error}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={disabled || !value.trim()}
        whileHover={{ scale: disabled ? 1 : 1.04 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-ember-500 to-bloom-600 px-8 py-3 font-body text-base font-medium text-white shadow-lg shadow-ember-500/20 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
      >
        {copy.submitLabel}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 2 11 13" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 2 15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    </motion.form>
  );
}