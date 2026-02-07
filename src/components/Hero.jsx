import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "../hooks/useMousePosition";
import { useCursor } from "../context/CursorContext";
import { useReducedMotion } from "../hooks/useReducedMotion";
import MagneticButton from "./MagneticButton";

const HERO_NAME_ENTRANCE = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
};
const NAME_LIFT = -1.5; // px (soft vertical lift on hover, desktop only)

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  const ref = useRef(null);
  const nameRef = useRef(null);
  const [nameHovered, setNameHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const { x, y } = useMousePosition();
  const { setCursor } = useCursor();
  const reducedMotion = useReducedMotion();
  const w = typeof window !== "undefined" ? window.innerWidth : 1920;
  const h = typeof window !== "undefined" ? window.innerHeight : 1080;
  const parallaxX = ((x - w / 2) / w) * 12;
  const parallaxY = ((y - h / 2) / h) * 12;

  useEffect(() => {
    setIsTouch(typeof window !== "undefined" && "ontouchstart" in window);
  }, []);

  const handleNameMouseLeave = () => {
    setNameHovered(false);
    setCursor("", "default");
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-dark-bg"
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #0f1018 25%, #0d1220 50%, #0a0d18 75%, #080c18 100%)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59, 130, 246, 0.12), transparent 50%)",
        }}
      />
      {/* Optional: very subtle noise */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center min-h-[70vh]">
        <motion.div
          className="w-full flex flex-col items-center justify-center"
          style={{
            transform: `translate(${parallaxX}px, ${parallaxY}px)`,
          }}
        >
          <motion.h1
            ref={nameRef}
            className="hero-name text-white uppercase whitespace-nowrap select-none block text-center mb-6"
            style={{
              fontFamily: '"akira-expanded", "Bebas Neue", sans-serif',
              fontWeight: 700,
              letterSpacing: "0.12em",
              lineHeight: 0.9,
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              transformOrigin: "center center",
            }}
            initial={
              reducedMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 30, scale: 0.97 }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: reducedMotion ? 0 : HERO_NAME_ENTRANCE.duration,
              ease: HERO_NAME_ENTRANCE.ease,
            }}
            onMouseEnter={() => {
              if (!isTouch) {
                setNameHovered(true);
                setCursor("", "link");
              }
            }}
            onMouseLeave={handleNameMouseLeave}
          >
            <span
              className="hero-name-inner block transition-[letter-spacing,transform,filter] duration-300 ease-out"
              style={{
                letterSpacing: nameHovered && !isTouch ? "0.16em" : "0.12em",
                transform: nameHovered && !isTouch ? `translateY(${NAME_LIFT}px)` : "translateY(0)",
                filter: nameHovered && !isTouch ? "brightness(1.06) contrast(1.02)" : "brightness(1) contrast(1)",
              }}
            >
              ROHIT VERMA
            </span>
          </motion.h1>
          {/* <p className="text-lg md:text-xl text-white/80 font-medium mb-2">
            Frontend Developer & Designer
          </p> */}
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto mb-10">
            Where systems thinking meets refined digital craftsmanship.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            cursorText="View work"
            className="px-6 py-3 rounded-full bg-white font-semibold text-sm hover:bg-white/95 transition-colors text-[#0c0c0c]"
            onClick={() => scrollToSection("projects")}
          >
            View work
          </MagneticButton>
          <MagneticButton
            cursorText="Get in touch"
            className="px-6 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-colors"
            onClick={() => scrollToSection("contact")}
          >
            Get in touch
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-1 h-2 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
