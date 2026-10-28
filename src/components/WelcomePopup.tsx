import { AnimatePresence, motion } from "framer-motion";

export function WelcomePopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-md rounded-3xl border border-[#ff2d9b]/40 bg-black p-7 text-center shadow-[0_0_60px_-10px_rgba(255,45,155,0.5)]"
          >
            <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">
              Before you begin ♡
            </h2>

            <p className="mt-4 font-body text-sm leading-relaxed text-white/70">
              If you're feeling low, write it down — most people feel a lot better
              after putting it into words. And if it's a happy moment, write that
              too. It works like an affirmation: it builds self-pride and boosts
              your motivation.
            </p>

            <p className="mt-3 font-body text-sm leading-relaxed text-white/70">
              I'll listen, and I'll remind you to document it — whether it's sad or happy.
            </p>

            <p className="mt-4 font-body text-xs italic leading-relaxed text-[#ff8cc6]/80">
              Dil bhaari ho to usay likh do, likhne ke baad kaafi behtar mehsoos hota
              hai. Aur khushi ka lamha ho to usay likhna aur bhi acha hai — khud par
              fakhar aur motivation barhta hai.
            </p>

            <div className="mt-5 flex items-center justify-center gap-3 font-body text-xs text-white/50">
              <span>☁ Heavy moment</span>
              <span className="text-[#ff2d9b]">·</span>
              <span>✦ Happy moment</span>
            </div>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 rounded-full bg-[#ff2d9b] px-8 py-3 font-body text-sm font-medium text-white shadow-lg shadow-[#ff2d9b]/30"
            >
              Got it
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}