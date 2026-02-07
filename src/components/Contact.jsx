import { useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "../context/CursorContext";
import {
  CINEMATIC_VIEWPORT,
  CINEMATIC_TRANSITION,
  CINEMATIC_INITIAL,
  CINEMATIC_ANIMATE,
} from "./SectionTransition";

const STAGGER = 0.08;

export default function Contact() {
  const [focused, setFocused] = useState(null);
  const { setCursor } = useCursor();

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-xl mx-auto">
        <motion.h2
          initial={CINEMATIC_INITIAL}
          whileInView={CINEMATIC_ANIMATE}
          viewport={CINEMATIC_VIEWPORT}
          transition={{ ...CINEMATIC_TRANSITION, delay: 0 }}
          className="font-display font-bold text-3xl md:text-4xl text-white mb-4"
        >
          Get in touch
        </motion.h2>
        <motion.p
          initial={CINEMATIC_INITIAL}
          whileInView={CINEMATIC_ANIMATE}
          viewport={CINEMATIC_VIEWPORT}
          transition={{ ...CINEMATIC_TRANSITION, delay: STAGGER }}
          className="text-white/60 text-lg mb-10"
        >
          Have a project in mind? Drop a line.
        </motion.p>

        <form
          className="space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
          {[
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "message", label: "Message", type: "textarea" },
          ].map((field, i) => (
            <motion.div
              key={field.name}
              initial={CINEMATIC_INITIAL}
              whileInView={CINEMATIC_ANIMATE}
              viewport={CINEMATIC_VIEWPORT}
              transition={{ ...CINEMATIC_TRANSITION, delay: STAGGER * 2 + i * 0.06 }}
            >
              <label
                htmlFor={field.name}
                className="block text-white/70 text-sm font-medium mb-2"
              >
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={4}
                  onFocus={() => setFocused(field.name)}
                  onBlur={() => setFocused(null)}
                  onMouseEnter={() => setCursor("", "link")}
                  onMouseLeave={() => setCursor("", "default")}
                  className="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white placeholder-white/40 focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30 focus:outline-none transition-all duration-300 resize-none"
                  placeholder={`Your ${field.label.toLowerCase()}...`}
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  onFocus={() => setFocused(field.name)}
                  onBlur={() => setFocused(null)}
                  onMouseEnter={() => setCursor("", "link")}
                  onMouseLeave={() => setCursor("", "default")}
                  className="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white placeholder-white/40 focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30 focus:outline-none transition-all duration-300"
                  placeholder={`Your ${field.label.toLowerCase()}...`}
                />
              )}
            </motion.div>
          ))}

          <motion.div
            initial={CINEMATIC_INITIAL}
            whileInView={CINEMATIC_ANIMATE}
            viewport={CINEMATIC_VIEWPORT}
            transition={{ ...CINEMATIC_TRANSITION, delay: STAGGER * 2 + 0.12 }}
          >
            <button
              type="submit"
              onMouseEnter={() => setCursor("Send", "button")}
              onMouseLeave={() => setCursor("", "default")}
              className="px-6 py-3 rounded-xl bg-white font-semibold text-sm hover:bg-white/95 transition-colors text-[#0c0c0c]"
            >
              Send message
            </button>
          </motion.div>
        </form>

        <motion.div
          initial={CINEMATIC_INITIAL}
          whileInView={CINEMATIC_ANIMATE}
          viewport={CINEMATIC_VIEWPORT}
          transition={{ ...CINEMATIC_TRANSITION, delay: STAGGER * 3 }}
          className="mt-12 pt-8 border-t border-dark-border"
        >
          <p className="text-white/50 text-sm mb-2">Or reach out directly</p>
          <a
            href="mailto:hello@example.com"
            onMouseEnter={() => setCursor("Open", "link")}
            onMouseLeave={() => setCursor("", "default")}
            className="text-white/90 hover:text-white font-medium transition-colors"
          >
            hello@example.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
