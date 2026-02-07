import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "../hooks/useMousePosition";
import { useCursor } from "../context/CursorContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const { cursorText, cursorVariant } = useCursor();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isTouch = typeof window !== "undefined" && "ontouchstart" in window;
  const showCursor = mounted && !reduced && !isTouch;

  useEffect(() => {
    document.body.classList.toggle("cursor-custom", showCursor);
    return () => document.body.classList.remove("cursor-custom");
  }, [showCursor]);

  if (!showCursor) return null;

  const isButton = cursorVariant === "button";
  const isProject = cursorVariant === "project";
  const isLink = cursorVariant === "link";

  const size = isButton ? 48 : isProject ? 64 : 24;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: x - size / 2,
          y: y - size / 2,
        }}
        initial={false}
        animate={{
          x: x - size / 2,
          y: y - size / 2,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.5,
        }}
      >
        <motion.div
          className="rounded-full border-2 border-white/80 bg-white/5 backdrop-blur-sm"
          animate={{
            width: size,
            height: size,
            boxShadow: isButton
              ? "0 0 24px rgba(255,255,255,0.15)"
              : "0 0 12px rgba(255,255,255,0.08)",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </motion.div>
      {(isProject || isLink) && cursorText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{
            x: x + 24,
            y: y - 12,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
        >
          <span className="text-sm font-medium text-white whitespace-nowrap bg-dark-card px-3 py-1.5 rounded-full border border-dark-border shadow-xl">
            {cursorText}
          </span>
        </motion.div>
      )}
    </>
  );
}
