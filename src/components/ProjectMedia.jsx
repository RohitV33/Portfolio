import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProjectMedia({
  videoUrl,
  posterUrl,
  alt = "Project preview",
}) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(typeof window !== "undefined" && "ontouchstart" in window);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl || isTouch) return;
    if (hovered) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [hovered, videoUrl, isTouch]);

  const hasVideo = videoUrl && !isTouch;

  return (
    <div
      className="w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="relative aspect-video w-full overflow-hidden rounded-2xl border border-dark-border bg-dark-card/40"
        initial={false}
        whileHover={
          isTouch
            ? undefined
            : {
                scale: 1.015,
                transition: { duration: 0.3, ease: "easeOut" },
              }
        }
        style={{
          boxShadow:
            hovered && !isTouch
              ? "0 8px 32px rgba(0,0,0,0.2)"
              : "0 2px 16px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.35s ease",
        }}
      >
        {hasVideo ? (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterUrl}
              muted
              loop
              playsInline
              preload="metadata"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover z-0"
              aria-label={alt}
            />
            {posterUrl && (
              <img
                src={posterUrl}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity pointer-events-none ${
                  hovered ? "opacity-0" : "opacity-100"
                }`}
                style={{ transitionDuration: "400ms" }}
                loading="lazy"
              />
            )}
            {!posterUrl && (
              <div
                className={`absolute inset-0 bg-dark-bg z-10 transition-opacity duration-300 ${
                  hovered ? "opacity-0" : "opacity-100"
                }`}
              />
            )}
          </>
        ) : (
          <img
            src={
              posterUrl ||
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
            }
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </motion.div>
    </div>
  );
}
