import { ReactNode } from "react";
import { motion } from "framer-motion";

export function WindowFrame({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
    >
      <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ember-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-bloom-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-hush-400/70" />
        {label && (
          <span className="ml-2 font-body text-xs tracking-wide text-white/35">{label}</span>
        )}
      </div>
      <div className="px-6 py-8 sm:px-10 sm:py-10">{children}</div>
    </motion.div>
  );
}
