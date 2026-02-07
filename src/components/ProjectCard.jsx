import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "../context/CursorContext";

export default function ProjectCard({
  title,
  description,
  tech,
  image,
  video,
  onClick,
  index,
}) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);
  const { setCursor } = useCursor();

  const handleMouseEnter = () => {
    setHovered(true);
    setCursor("View", "project");
    if (video && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setCursor("", "default");
    if (video && videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-white/10 transition-colors duration-300 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {video && (
          <video
            ref={videoRef}
            src={video}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
            muted
            loop
            playsInline
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      <div className="p-6 md:p-8">
        <h3 className="font-display font-semibold text-xl md:text-2xl text-white mb-2 transition-colors">
          {title}
        </h3>
        <p className="text-white/70 text-sm md:text-base mb-3 line-clamp-2">
          {description}
        </p>
        <p className="text-white/45 text-xs md:text-sm font-medium tracking-wide">
          {tech}
        </p>
      </div>
    </motion.article>
  );
}
