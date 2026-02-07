/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Space Grotesk", "system-ui", "sans-serif"],
        display: ["Playfair Display", "serif"],
        grotesk: ["Space Grotesk", "sans-serif"],
        akira: ["akira-expanded", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      colors: {
        dark: {
          bg: "#0a0a0f",
          surface: "#0f0f14",
          card: "#12121a",
          border: "rgba(255,255,255,0.06)",
        },
        accent: {
          blue: "#3b82f6",
          glow: "rgba(59, 130, 246, 0.25)",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #0a0a0f 0%, #0f1018 40%, #0a0d14 70%, #080c18 100%)",
      },
    },
  },
  plugins: [],
};
