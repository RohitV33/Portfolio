import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useCursor } from "../context/CursorContext";

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const SCROLL_THRESHOLD = 70;
const HEADER_TRANSITION = { duration: 0.35, ease: "easeOut" };

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    el.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { setCursor } = useCursor();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const y = window.scrollY;
      if (y <= SCROLL_THRESHOLD) {
        setHeaderVisible(true);
      } else if (y > lastScrollY.current) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 "
      initial={false}
      animate={{ y: headerVisible ? 0 : "-100%" }}
      transition={HEADER_TRANSITION}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a
          href="#hero"
          className="font-grotesk font-semibold text-lg tracking-tight text-white hover:text-white/90 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
          onMouseEnter={() => setCursor("", "link")}
          onMouseLeave={() => setCursor("", "default")}
        >
          PORTFOLIO
        </a>
        <nav className="hidden md:flex items-center gap-8" aria-label="Main">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-white/60 text-sm font-medium hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.id);
              }}
              onMouseEnter={() => setCursor("", "link")}
              onMouseLeave={() => setCursor("", "default")}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden w-10 h-10 flex items-center justify-center text-white/80"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "×" : "≡"}
        </button>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden absolute top-full left-0 right-0 py-6 px-6 bg-dark-bg/98 border-b border-dark-border backdrop-blur-md"
        >
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="block py-2 text-white/80 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.id);
                setOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
