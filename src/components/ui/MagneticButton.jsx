import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function MagneticButton({
  children,
  href,
  download,
  variant = "primary",
  className = "",
}) {
  const buttonRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = {
    stiffness: 180,
    damping: 18,
    mass: 0.5,
  };

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (event) => {
    const element = buttonRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;

    x.set(distanceX * 0.18);
    y.set(distanceY * 0.18);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variants = {
    primary:
      "border-cyan-400/50 bg-cyan-400 text-[#050816] hover:bg-cyan-300 hover:shadow-[0_0_35px_rgba(0,229,255,0.35)]",

    secondary:
      "border-white/20 bg-white/5 text-white hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]",
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      download={download}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onBlur={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      whileTap={{ scale: 0.96 }}
      className={`
        group relative inline-flex
        min-h-14 items-center justify-center
        overflow-hidden rounded-xl
        border px-8 py-4
        text-center font-semibold
        shadow-lg
        transition-[background-color,border-color,box-shadow]
        duration-300
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-cyan-400
        ${variants[variant] || variants.primary}
        ${className}
      `}
    >
      {/* Animated Shine */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/25
          to-transparent
          transition-transform
          duration-700
          group-hover:translate-x-full
        "
      />

      {/* Button Content */}
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}