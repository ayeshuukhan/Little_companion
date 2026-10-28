/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        script: ["Caveat", "cursive"],
      },
      colors: {
        dusk: {
          950: "#171025",
          900: "#1f1830",
          800: "#2b2140",
          700: "#3a2c54",
        },
                ember: {
          400: "rgb(var(--ember-400) / <alpha-value>)",
          500: "rgb(var(--ember-500) / <alpha-value>)",
          600: "rgb(var(--ember-600) / <alpha-value>)",
        },
        bloom: {
          400: "rgb(var(--bloom-400) / <alpha-value>)",
          500: "rgb(var(--bloom-500) / <alpha-value>)",
          600: "rgb(var(--bloom-600) / <alpha-value>)",
        },
        hush: {
          300: "rgb(var(--hush-300) / <alpha-value>)",
          400: "rgb(var(--hush-400) / <alpha-value>)",
          500: "rgb(var(--hush-500) / <alpha-value>)",
          600: "rgb(var(--hush-600) / <alpha-value>)",
        },
        base: {
          charcoal: "#0c0c12",
          midnight: "#0a0e1a",
          neutral: "#efe6da",
        },
        happy: {
          coral: "#ff7a59",
          peach: "#ffb08a",
          rose: "#ff6f91",
          champagne: "#f3e6c8",
        },
        sad: {
          dusty: "#7c93b8",
          slate: "#5c6b82",
          indigo: "#4a5a8a",
        },
        companion: {
          cream: "#fff3e0",
          glow: "#ffe3c2",
        },
      },
      boxShadow: {
        glow: "0 0 80px 10px rgba(255, 138, 92, 0.35)",
        "glow-sad": "0 0 80px 10px rgba(143, 139, 255, 0.35)",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.55" },
          "50%": { transform: "scale(1.08)", opacity: "0.85" },
        },
        drift: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "1" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-16px) translateX(6px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.85" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        breathe: "breathe 4.5s ease-in-out infinite",
        drift: "drift 6s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "glow-pulse": "glowPulse 5s ease-in-out infinite",
        "breathe-slow": "breathe 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
      },
    },
  },

  plugins: [],
};