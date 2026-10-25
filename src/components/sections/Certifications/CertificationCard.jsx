import { motion } from "motion/react";
import {
  Maximize2,
  GraduationCap,
  Award,
  ShieldCheck,
} from "lucide-react";

export default function CertificationCard({
  certification,
  onSelect,
}) {
  const isDiploma = certification.category === "diploma";

  const cardClassName =
    "group overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left transition-colors hover:border-cyan-400/40";

  const content = (
    <>
      {/* Visual */}
      <div className="relative h-52 overflow-hidden bg-white/5">
        {isDiploma ? (
          /* Private diploma visual — no document image */
          <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#10162e] via-[#11112b] to-[#050816]">
            <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-purple-500/15 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-400/10 shadow-[0_0_40px_rgba(139,92,246,0.15)]">
              <GraduationCap
                size={42}
                aria-hidden="true"
                className="text-purple-300"
              />
            </div>

            <span className="relative mt-5 font-mono text-xs uppercase tracking-[0.25em] text-purple-200">
              Academic Achievement
            </span>

            <span className="relative mt-2 flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck
                size={14}
                aria-hidden="true"
                className="text-cyan-400"
              />
              Credential Details
            </span>
          </div>
        ) : (
          <>
            {/* Existing certification image */}
            <img
              src={certification.thumbnail || certification.image}
              alt={certification.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#050816]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm text-cyan-400 backdrop-blur-md">
                <Maximize2 size={17} aria-hidden="true" />
                View Document
              </span>
            </div>
          </>
        )}

        {/* Type Badge */}
        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur-md ${isDiploma
            ? "border-purple-400/30 bg-purple-500/20 text-purple-300"
            : "border-cyan-400/30 bg-cyan-500/20 text-cyan-300"
            }`}
        >
          {isDiploma ? (
            <GraduationCap size={14} aria-hidden="true" />
          ) : (
            <Award size={14} aria-hidden="true" />
          )}

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
    </>
  );

  if (isDiploma) {
    return (
      <motion.article
        layout
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className={cardClassName}
      >
        {content}
      </motion.article>
    );
  }

  return (
    <motion.button
      layout
      type="button"
      onClick={onSelect}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={cardClassName}
    >
      {content}
    </motion.button>
  );
}