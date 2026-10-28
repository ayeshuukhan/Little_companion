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
          400: "#ff6fb5",
          500: "#ff2d9b",
          600: "#e0117f",
        },
        bloom: {
          400: "#ff9ed2",
          500: "#ff4fae",
          600: "#d6107a",
        },
        hush: {
          300: "#ffc2e2",
          400: "#ff9ad0",
          500: "#ff6fba",
          600: "#e0489f",
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