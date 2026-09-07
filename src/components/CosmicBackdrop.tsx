// import { motion } from "framer-motion";

// /**
//  * Soft nebula clouds + distant planets sitting behind the main content,
//  * echoing the reference space-theme: large blurred color blooms plus a
//  * couple of shadowed planet spheres tucked in the corners.
//  */
// export function CosmicBackdrop() {
//   return (
//     <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
//       {/* nebula color blooms */}
//       <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-bloom-600/20 blur-[100px]" />
//       <div className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-hush-500/15 blur-[110px]" />
//       <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-ember-500/10 blur-[100px]" />

//       {/* distant planets */}
//       <motion.div
//         className="absolute -left-16 bottom-[-4rem] h-56 w-56 rounded-full"
//         style={{
//           background:
//             "radial-gradient(circle at 32% 32%, rgba(120,110,160,0.9), rgba(30,22,45,0.95) 65%)",
//           boxShadow: "0 0 90px 10px rgba(120,110,255,0.08)",
//         }}
//         animate={{ y: [0, -10, 0] }}
//         transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute -right-20 top-8 h-28 w-28 rounded-full"
//         style={{
//           background:
//             "radial-gradient(circle at 35% 30%, rgba(90,150,140,0.85), rgba(15,25,25,0.95) 70%)",
//           boxShadow: "0 0 60px 8px rgba(90,200,170,0.08)",
//         }}
//         animate={{ y: [0, 8, 0] }}
//         transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
//       />

//       {/* faint scattered dust */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.04),_transparent_55%)]" />
//     </div>
//   );
// }


import { motion } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";

export function CosmicBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#171528,_transparent_60%)]" />

      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-happy-rose/10 blur-[100px]" />
      <div className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-sad-indigo/15 blur-[110px]" />
      <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-happy-coral/10 blur-[100px]" />
      <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-sad-dusty/10 blur-[100px]" />

      <FloatingParticles />

      <motion.div
        className="absolute -left-16 bottom-[-4rem] h-56 w-56 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 32%, rgba(120,110,160,0.9), rgba(30,22,45,0.95) 65%)",
          boxShadow: "0 0 90px 10px rgba(120,110,255,0.08)",
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 top-8 h-28 w-28 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(124,147,184,0.85), rgba(15,20,30,0.95) 70%)",
          boxShadow: "0 0 60px 8px rgba(124,147,184,0.1)",
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,230,218,0.04),_transparent_55%)]" />
    </div>
  );
}