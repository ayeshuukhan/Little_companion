import { motion } from "framer-motion";
import { HugAnimation } from "./HugAnimation";
import { ReactionLine } from "../data/responses";

export function SadReaction({ line }: { line: ReactionLine }) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center py-6">
      <HugAnimation />
      <motion.div
        key={line.spoken}
        className="relative z-10 flex flex-col items-center gap-4 text-center"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="text-3xl">💗</span>
        <p className="font-script text-3xl text-hush-300 sm:text-4xl">{line.spoken}</p>
        <p className="font-body text-base text-white/70">{line.written}</p>
      </motion.div>
    </div>
  );
}
