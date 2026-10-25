import { useRef, useState } from "react";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

export default function TiltCard({
  children,
  className = "",
  intensity = 8,
}) {
  const cardRef = useRef(null);

  const [hovered, setHovered] = useState(false);

  const reduceMotion = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const springConfig = {
    stiffness: 180,
    damping: 22,
    mass: 0.7,
  };

  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (event) => {
    if (reduceMotion) return;

    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = x / rect.width;
    const percentY = y / rect.height;

    rotateX.set(((centerY - y) / centerY) * intensity);
    rotateY.set(((x - centerX) / centerX) * intensity);

    mouseX.set(percentX * 100);
    mouseY.set(percentY * 100);

    card.style.setProperty("--mouse-x", `${percentX * 100}%`);
    card.style.setProperty("--mouse-y", `${percentY * 100}%`);
  };

  const handleMouseLeave = () => {
    setHovered(false);

    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      style={{
        perspective: "1200px",
      }}
      className={className}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d",
        }}
        className="
          group relative
          h-full
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-[#0B1020]/90
          transition-[border-color,box-shadow]
          duration-500
          hover:border-cyan-400/40
          hover:shadow-[0_20px_60px_rgba(0,229,255,0.12)]
        "
      >
        {/* Mouse-following glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            z-0
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
          style={{
            background: `
              radial-gradient(
                450px circle at
                var(--mouse-x, 50%)
                var(--mouse-y, 50%),
                rgba(0,229,255,0.14),
                rgba(139,92,246,0.07) 35%,
                transparent 70%
              )
            `,
          }}
        />

        {/* Animated border glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            rounded-2xl
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
          style={{
            boxShadow:
              "inset 0 0 25px rgba(0,229,255,0.06)",
          }}
        />

        {/* Card content */}

        <div
          className="relative z-10 h-full"
          style={{
            transform:
              hovered && !reduceMotion
                ? "translateZ(25px)"
                : "translateZ(0px)",
            transition: "transform 0.4s ease",
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}