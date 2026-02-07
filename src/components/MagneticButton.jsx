import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "../hooks/useMousePosition";
import { useCursor } from "../context/CursorContext";

const MAGNETIC_STRENGTH = 0.3;
const MAGNETIC_RADIUS = 120;

export default function MagneticButton({
  children,
  className = "",
  onMouseEnter,
  onMouseLeave,
  cursorText = "Open",
  ...props
}) {
  const ref = useRef(null);
  const { x, y } = useMousePosition();
  const { setCursor } = useCursor();
  const [hovered, setHovered] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    setHovered(true);
    setCursor(cursorText, "button");
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e) => {
    setHovered(false);
    setOffset({ x: 0, y: 0 });
    setCursor("", "default");
    onMouseLeave?.(e);
  };

  const handleMouseMove = (e) => {
    if (!ref.current || !hovered) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = x - centerX;
    const distY = y - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);
    if (distance < MAGNETIC_RADIUS) {
      const pull = (1 - distance / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH;
      setOffset({
        x: distX * pull,
        y: distY * pull,
      });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
