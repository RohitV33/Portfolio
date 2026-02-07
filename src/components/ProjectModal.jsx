import { useEffect } from "react";
import { motion } from "framer-motion";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-dark-bg/95 backdrop-blur-md"
        aria-hidden
      />
      <motion.div
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-dark-card border border-dark-border shadow-2xl"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-video relative overflow-hidden rounded-t-2xl">
          {project.video ? (
            <video
              src={project.video}
              className="w-full h-full object-cover"
              controls
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={project.image}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="p-6 md:p-10">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
            {project.title}
          </h2>
          <p className="text-white/60 text-sm mb-4">{project.tech}</p>
          <p className="text-white/80 text-base leading-relaxed">
            {project.description}
          </p>
        </div>
        <button
          type="button"
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </motion.div>
    </motion.div>
  );
}
