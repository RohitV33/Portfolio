import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "../hooks/useMousePosition";
import { useCursor } from "../context/CursorContext";
import {
  CINEMATIC_VIEWPORT,
  CINEMATIC_TRANSITION,
  CINEMATIC_INITIAL,
  CINEMATIC_ANIMATE,
} from "./SectionTransition";

const HIGHLIGHT_WORDS = ["clean", "fast", "memorable"];
const STAGGER = 0.08;

// Replace with your own URLs: real photo + anime-style portrait
const ABOUT_IMAGE = {
  
  anime:
    "https://i.pinimg.com/736x/7f/78/22/7f782235063de037a978053f102e1c70.jpg",
};

function HighlightedText({ text, highlights }) {
  const parts = [];
  let lastIndex = 0;
  const regex = new RegExp(`\\b(${highlights.join("|")})\\b`, "gi");
  let match;
  while ((match = regex.exec(text)) !== null) {
    parts.push({ type: "normal", text: text.slice(lastIndex, match.index) });
    parts.push({ type: "highlight", text: match[0] });
    lastIndex = match.index + match[0].length;
  }
  parts.push({ type: "normal", text: text.slice(lastIndex) });

  return (
    <p className="text-white/80 text-base md:text-lg leading-relaxed">
      {parts.map((part, i) =>
        part.type === "highlight" ? (
          <motion.span
            key={i}
            className="text-white font-medium"
            initial={{ opacity: 0.8 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {part.text}
          </motion.span>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </p>
  );
}

export default function About() {
  const mediaRef = useRef(null);
  const [profileMode, setProfileMode] = useState("anime"); // "anime" | "photo"
  const [mediaHovered, setMediaHovered] = useState(false);
  const { x, y } = useMousePosition();
  const { setCursor } = useCursor();

  const w = typeof window !== "undefined" ? window.innerWidth : 1920;
  const h = typeof window !== "undefined" ? window.innerHeight : 1080;
  const centerX = w / 2;
  const centerY = h / 2;
  const parallaxStrength = 6;
  const offsetX = mediaHovered ? ((x - centerX) / w) * parallaxStrength : 0;
  const offsetY = mediaHovered ? ((y - centerY) / h) * parallaxStrength : 0;

  const profileSrc =
    profileMode === "anime" ? ABOUT_IMAGE.anime : ABOUT_IMAGE.photo;

  return (
    <section id="about" className="relative py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <motion.h2
              initial={CINEMATIC_INITIAL}
              whileInView={CINEMATIC_ANIMATE}
              viewport={CINEMATIC_VIEWPORT}
              transition={{ ...CINEMATIC_TRANSITION, delay: 0 }}
              className="font-display font-bold text-3xl md:text-4xl text-white mb-6"
            >
              About
            </motion.h2>
            <motion.div
              initial={CINEMATIC_INITIAL}
              whileInView={CINEMATIC_ANIMATE}
              viewport={CINEMATIC_VIEWPORT}
              transition={{ ...CINEMATIC_TRANSITION, delay: STAGGER }}
            >
              <HighlightedText
                text="I build clean, fast interfaces and memorable digital experiences. Focused on clarity, performance, and craft — from product and branding to code."
                highlights={HIGHLIGHT_WORDS}
              />
            </motion.div>
          </div>

          <motion.div
            ref={mediaRef}
            initial={CINEMATIC_INITIAL}
            whileInView={CINEMATIC_ANIMATE}
            viewport={CINEMATIC_VIEWPORT}
            transition={{ ...CINEMATIC_TRANSITION, delay: STAGGER * 2 }}
            className="relative flex flex-col items-center gap-4"
          >
            <div
              className="relative rounded-2xl overflow-hidden border border-dark-border 
             w-[260px] h-[360px] 
             md:w-[300px] md:h-[420px] 
             lg:w-[340px] lg:h-[480px]
             bg-dark-card/30"
              onMouseEnter={() => {
                setMediaHovered(true);
                setCursor("", "link");
              }}
              onMouseLeave={() => {
                setMediaHovered(false);
                setCursor("", "default");
              }}
              style={{
                transform: `translate(${offsetX}px, ${offsetY}px)`,
                transition: "transform 0.25s ease-out",
              }}
            >
              <img
                src={profileSrc}
                alt="Profile"
                className={`absolute inset-0 w-full h-full object-cover object-top ${
                  profileMode === "anime"
                    ? "contrast-[1.02] saturate-[0.85]"
                    : ""
                }`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/50 to-transparent pointer-events-none" />
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
