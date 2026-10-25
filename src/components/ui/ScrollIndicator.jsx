import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";

export default function ScrollIndicator() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href="#about"
      aria-label="Scroll to About section"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="
        group relative
        inline-flex flex-col
        items-center gap-3
        rounded-xl px-4 py-3
        focus-visible:outline-2
        focus-visible:outline-cyan-400
      "
    >
      {/* Label */}
      <span
        className="
          text-[10px] font-semibold
          uppercase tracking-[0.3em]
          text-gray-400
          transition-colors duration-300
          group-hover:text-cyan-400
        "
      >
        Explore The Universe
      </span>

      {/* Cosmic line */}
      <div className="relative h-12 w-px overflow-hidden bg-white/15">
        <motion.div
          className="
            absolute left-0 top-0
            h-6 w-px
            bg-gradient-to-b
            from-cyan-400
            via-purple-400
            to-pink-400
          "
          animate={reduceMotion ? undefined : { y: [-24, 48] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Arrow */}
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ArrowDown
          size={18}
          className="
            text-cyan-400
            drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]
            transition-colors duration-300
            group-hover:text-purple-400
          "
        />
      </motion.div>
    </motion.a>
  );
}