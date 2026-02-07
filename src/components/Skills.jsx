import { motion } from "framer-motion";
import {
  CINEMATIC_VIEWPORT,
  CINEMATIC_TRANSITION,
  CINEMATIC_INITIAL,
  CINEMATIC_ANIMATE,
} from "./SectionTransition";

const STAGGER = 0.08;

const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["Python", "Java", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frameworks",
    items: ["React.js", "TailwindCSS"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "MySQL"],
  },
  {
    title: "Tools",
    items: ["Git", "VS Code"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={CINEMATIC_INITIAL}
          whileInView={CINEMATIC_ANIMATE}
          viewport={CINEMATIC_VIEWPORT}
          transition={{ ...CINEMATIC_TRANSITION, delay: 0 }}
          className="font-display font-bold text-3xl md:text-4xl text-white mb-4"
        >
          Skills
        </motion.h2>
        <motion.p
          initial={CINEMATIC_INITIAL}
          whileInView={CINEMATIC_ANIMATE}
          viewport={CINEMATIC_VIEWPORT}
          transition={{ ...CINEMATIC_TRANSITION, delay: STAGGER }}
          className="text-white/60 text-lg mb-14 max-w-xl"
        >
          Languages, frameworks, and tools I use to build and ship.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={CINEMATIC_INITIAL}
              whileInView={CINEMATIC_ANIMATE}
              viewport={CINEMATIC_VIEWPORT}
              transition={{ ...CINEMATIC_TRANSITION, delay: STAGGER * 2 + gi * 0.06 }}
              className="rounded-xl border border-dark-border bg-dark-card/30 px-6 py-5"
            >
              <h3 className="text-white/90 font-semibold text-sm uppercase tracking-wider mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-white/75 text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
