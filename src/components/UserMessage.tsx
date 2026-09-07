import { motion } from "framer-motion";

interface UserMessageProps {
  text: string;
}

export function UserMessage({ text }: UserMessageProps) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl text-center font-display text-xl italic leading-snug text-white/85 sm:text-2xl"
    >
      “{text}”
    </motion.blockquote>
  );
}
