import { motion } from "framer-motion";
import { useCursor } from "../context/CursorContext";
import ProjectMedia from "./ProjectMedia";
import {
  CINEMATIC_VIEWPORT,
  CINEMATIC_TRANSITION,
  CINEMATIC_INITIAL,
  CINEMATIC_ANIMATE,
} from "./SectionTransition";

const STAGGER = 0.08;

const PROJECTS = [
  {
    id: "1",
    title: "Automated Web Fuzzing Tool",
    description:
      "Automated security testing framework for detecting XSS, SQL injection, and command injection vulnerabilities.",
    features: [
      "Intelligent payload generation",
      "Heuristic-based detection",
      "Async multi-threaded scanning",
      "Safe rate-limiting",
      "JSON-based reports",
    ],
    tech: "Python, Requests, Node.js, scikit-learn, Vercel",
    timeline: "Aug 2025",
    liveUrl: "https://web-fuzzing-tool01.vercel.app/",
    liveLabel: "Live Project",
    videoUrl: "",
    posterUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
  },
  {
    id: "2",
    title: "Portfolio Website",
    description: "Personal portfolio showcasing projects and achievements.",
    features: [
      "Responsive design",
      "Dynamic project listings",
      "Contact form with backend integration",
      "CI/CD automation",
    ],
    tech: "React.js, TailwindCSS",
    timeline: "May 2024",
    liveUrl: "#",
    liveLabel: "Live Website",
    videoUrl: "",
    posterUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
  },
  {
    id: "3",
    title: "Student Attendance Tracker (SIH 2025)",
    description:
      "Student attendance management system built for Smart India Hackathon 2025.",
    features: [
      "Interactive dashboards",
      "Analytics & visual insights",
      "Real-time attendance updates",
      "Department-level statistics",
    ],
    tech: "React.js, Recharts, TailwindCSS",
    timeline: "Nov 2025",
    liveUrl: "https://github.com/RohitV33/Student-tracker",
    liveLabel: "Live Project",
    videoUrl: "",
    posterUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
];

function WorkProject({ project, index }) {
  const { setCursor } = useCursor();

  return (
    <motion.article
      initial={CINEMATIC_INITIAL}
      whileInView={CINEMATIC_ANIMATE}
      viewport={CINEMATIC_VIEWPORT}
      transition={{ ...CINEMATIC_TRANSITION, delay: index * 0.06 }}
      className="border-b border-dark-border py-14 md:py-20 first:pt-0"
    >
      <div className="grid grid-cols-1 md:grid-cols-[minmax(280px,0.48fr)_1fr] gap-10 md:gap-14 lg:gap-16 items-start">
        {/* Left: media */}
        <div className="w-full">
          <ProjectMedia
            videoUrl={project.videoUrl}
            posterUrl={project.posterUrl}
            alt={`${project.title} preview`}
          />
        </div>

        {/* Right: metadata and description */}
        <div className="flex flex-col min-w-0 max-w-xl">
          <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2">
            {project.timeline}
          </p>
          <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-4 leading-tight">
            {project.title}
          </h3>
          <p className="text-white/75 text-base md:text-lg leading-relaxed mb-6">
            {project.description}
          </p>
          <ul className="text-white/55 text-sm leading-relaxed space-y-2 mb-6">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="text-white/40 mt-0.5 flex-shrink-0">·</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <p className="text-white/45 text-sm font-medium mb-6">
            {project.tech}
          </p>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-white/90 text-sm font-medium hover:bg-white/5 hover:border-white/30 transition-colors w-fit"
            onMouseEnter={() => setCursor("Open", "link")}
            onMouseLeave={() => setCursor("", "default")}
          >
            {project.liveLabel}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={CINEMATIC_INITIAL}
          whileInView={CINEMATIC_ANIMATE}
          viewport={CINEMATIC_VIEWPORT}
          transition={{ ...CINEMATIC_TRANSITION, delay: 0 }}
          className="font-display font-bold text-3xl md:text-4xl text-white mb-4"
        >
          Work
        </motion.h2>
        <motion.p
          initial={CINEMATIC_INITIAL}
          whileInView={CINEMATIC_ANIMATE}
          viewport={CINEMATIC_VIEWPORT}
          transition={{ ...CINEMATIC_TRANSITION, delay: STAGGER }}
          className="text-white/60 text-lg mb-20 max-w-xl"
        >
          Selected projects across security, web development, and product.
        </motion.p>

        <div className="space-y-0">
          {PROJECTS.map((project, i) => (
            <WorkProject key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
