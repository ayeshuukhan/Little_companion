import { motion } from "framer-motion";
import { Fireworks } from "./Fireworks";
import { ReactionLine } from "../data/responses";

export function HappyReaction({ line }: { line: ReactionLine }) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center py-6">
      <Fireworks />
      <motion.div
        key={line.spoken}
        className="relative z-10 flex flex-col items-center gap-4 text-center"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <span className="text-3xl">🎆</span>
        <p className="font-script text-3xl text-ember-400 sm:text-4xl">{line.spoken}</p>
        <p className="font-body text-base text-white/70">{line.written}</p>
      </motion.div>
    </div>
  );
}
