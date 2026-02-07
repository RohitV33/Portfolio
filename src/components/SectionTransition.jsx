import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export const CINEMATIC_VIEWPORT = { once: true, margin: "-80px" };

export const CINEMATIC_TRANSITION = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
};

const CINEMATIC_INITIAL = {
  opacity: 0,
  y: 40,
  scale: 0.96,
};

const CINEMATIC_ANIMATE = {
  opacity: 1,
  y: 0,
  scale: 1,
};

export default function SectionTransition({ children }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={CINEMATIC_INITIAL}
      whileInView={CINEMATIC_ANIMATE}
      viewport={CINEMATIC_VIEWPORT}
      transition={CINEMATIC_TRANSITION}
    >
      {children}
    </motion.div>
  );
}

export { CINEMATIC_INITIAL, CINEMATIC_ANIMATE };
