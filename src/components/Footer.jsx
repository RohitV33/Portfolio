import { motion } from "framer-motion";

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rohit-verma-21ab511b4/" },
  { label: "GitHub", href: "https://github.com/RohitV33" },
  { label: "Instagram", href: "https://www.instagram.com/rohitunmasked" },
];

export default function Footer() {
  return (
    <footer className="relative py-12 md:py-16 px-6 md:px-12 border-t border-dark-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <motion.p
          className="text-white/50 text-sm"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          © {new Date().getFullYear()} Rohit Verma
        </motion.p>
        <nav className="flex items-center gap-8" aria-label="Footer links">
          {LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-white/50 text-sm hover:text-white/90 transition-colors"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
