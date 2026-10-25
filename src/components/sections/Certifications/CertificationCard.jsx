import { motion } from "motion/react";
import { Maximize2, GraduationCap, Award } from "lucide-react";

export default function CertificationCard({
  certification,
  onSelect,
}) {
  const isDiploma = certification.category === "diploma";

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left transition-colors hover:border-cyan-400/40"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-white/5">

        <img
          src={certification.thumbnail || certification.image}
          alt={certification.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#050816]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">

          <span className="flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm text-cyan-400 backdrop-blur-md">
            <Maximize2 size={17} />
            View Document
          </span>

        </div>

        {/* Type Badge */}
        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur-md ${isDiploma
            ? "border-purple-400/30 bg-purple-500/20 text-purple-300"
            : "border-cyan-400/30 bg-cyan-500/20 text-cyan-300"
            }`}
        >
          {isDiploma ? <GraduationCap size={14} /> : <Award size={14} />}
          {isDiploma ? "DIPLOMA" : "CERTIFICATION"}
        </span>

      </div>

      {/* Information */}
      <div className="p-5">

        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
          {certification.field}
        </p>

        <h3 className="text-base font-semibold leading-6 text-white">
          {certification.title}
        </h3>

        <p className="mt-3 text-sm text-gray-400">
          {certification.issuer}
        </p>

      </div>
    </motion.button>
  );
}