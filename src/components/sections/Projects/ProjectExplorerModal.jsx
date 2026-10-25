import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "motion/react";

import {
  X,
  ArrowUpRight,
  Shield,
  Cpu,
  Network,
  Layers3,
  Lightbulb,
  CheckCircle2,
  Code2,
  ExternalLink,
} from "lucide-react";

import { projectExplorer } from "../../../data/projectExplorer";

const categoryIcons = {
  security: Shield,
  network: Network,
  web: Code2,
  systems: Cpu,
};

const focusableSelector = [
  'a[href]:not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  'input:not([disabled]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export default function ProjectExplorerModal({
  project,
  onClose,
}) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);

  const reduceMotion = useReducedMotion();

  const details = projectExplorer[project.id];

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Focus management + scroll lock + keyboard controls
  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();

        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;

      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll(focusableSelector)
      ).filter(
        (element) =>
          element.getClientRects().length > 0 &&
          !element.closest("[inert]")
      );

      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    // Prevent focus from moving outside the dialog
    const handleFocusIn = (event) => {
      const dialog = dialogRef.current;

      if (dialog && !dialog.contains(event.target)) {
        closeButtonRef.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      cancelAnimationFrame(frame);

      document.body.style.overflow = previousOverflow;

      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);

      if (
        previousFocus instanceof HTMLElement &&
        previousFocus.isConnected
      ) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  const CategoryIcon =
    categoryIcons[project.category] || Layers3;

  if (!details) return null;

  return createPortal(
    <motion.div
      className="
        fixed inset-0 z-[99999]
        flex items-center justify-center
        bg-[#020617]/85
        p-0 backdrop-blur-xl
        sm:p-5
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.25,
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-explorer-title"
        aria-describedby="project-explorer-description"
        tabIndex={-1}
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 35, scale: 0.96 }
        }
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={
          reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 15, scale: 0.98 }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.35,
          ease: "easeOut",
        }}
        className="
          relative flex h-full w-full
          max-w-6xl flex-col
          overflow-hidden
          border border-cyan-400/20
          bg-[#050816]
          shadow-[0_0_100px_rgba(0,229,255,0.12)]
          sm:max-h-[92vh] sm:rounded-3xl
        "
      >
        {/* Top bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#0b1120] px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-green-400"
            />

            <span className="font-mono text-xs tracking-widest text-cyan-400">
              KHALID.OS / PROJECT EXPLORER
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="
              rounded-xl border border-white/10
              bg-white/5 p-3 text-white
              transition hover:border-cyan-400/40
              hover:bg-cyan-400/10
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-cyan-400
            "
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {/* Hero screenshot */}
          <div className="relative overflow-hidden border-b border-white/10 bg-[#030712]">
            <img
              src={project.image}
              alt={`${project.title} project interface`}
              width={1200}
              height={675}
              className="max-h-[430px] w-full object-contain"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/50 to-transparent" />
          </div>

          <div className="space-y-12 px-6 py-10 sm:px-10">
            {/* Project identity */}
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <CategoryIcon
                  size={20}
                  aria-hidden="true"
                  className="text-cyan-400"
                />

                <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
                  {project.category} / CASE STUDY
                </span>

                {project.featured && (
                  <span className="rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-xs text-purple-300">
                    FLAGSHIP PROJECT
                  </span>
                )}
              </div>

              <h2
                id="project-explorer-title"
                className="text-3xl font-black text-white sm:text-5xl"
              >
                {project.title}
              </h2>

              <p className="mt-4 text-lg text-cyan-300">
                {details.subtitle}
              </p>

              <p
                id="project-explorer-description"
                className="mt-6 max-w-4xl leading-8 text-gray-300"
              >
                {details.overview}
              </p>
            </div>

            {/* Tech stack */}
            <div>
              <SectionHeading
                icon={Cpu}
                title="Technology Stack"
                number="01"
              />

              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="
                      rounded-xl border border-cyan-400/20
                      bg-cyan-400/5 px-4 py-3
                      text-sm font-medium text-cyan-200
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenge & solution */}
            <div className="grid gap-5 md:grid-cols-2">
              <InfoCard
                label="THE CHALLENGE"
                title="Engineering Problem"
                text={details.challenge}
                color="purple"
              />

              <InfoCard
                label="THE SOLUTION"
                title="Technical Approach"
                text={details.solution}
                color="cyan"
              />
            </div>

            {/* Architecture */}
            <div>
              <SectionHeading
                icon={Network}
                title="System Architecture"
                number="02"
              />

              <div className="rounded-2xl border border-white/10 bg-[#0b1120] p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {details.architecture.map((step, index) => (
                    <div
                      key={`${step}-${index}`}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="
                          rounded-xl border border-cyan-400/20
                          bg-cyan-400/5 px-4 py-4
                          text-center font-mono text-xs
                          text-cyan-200
                        "
                      >
                        {step}
                      </div>

                      {index < details.architecture.length - 1 && (
                        <ArrowUpRight
                          size={18}
                          aria-hidden="true"
                          className="text-purple-400"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div>
              <SectionHeading
                icon={Shield}
                title="Key Highlights"
                number="03"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {details.highlights.map((highlight, index) => (
                  <div
                    key={`${highlight}-${index}`}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <CheckCircle2
                      size={20}
                      aria-hidden="true"
                      className="shrink-0 text-green-400"
                    />

                    <span className="text-sm leading-6 text-gray-300">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learnings */}
            <div>
              <SectionHeading
                icon={Lightbulb}
                title="Engineering Insights"
                number="04"
              />

              <div className="space-y-3">
                {details.learnings.map((learning, index) => (
                  <div
                    key={`${learning}-${index}`}
                    className="rounded-xl border-l-2 border-purple-400 bg-purple-400/5 px-5 py-4 text-gray-300"
                  >
                    {learning}
                  </div>
                ))}
              </div>
            </div>

            {/* External links */}
            {(project.github || project.demo) && (
              <div className="flex flex-wrap gap-4 border-t border-white/10 pt-8">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-[#050816]"
                  >
                    <Code2 size={18} aria-hidden="true" />
                    View Source Code
                  </a>
                )}

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-white"
                  >
                    <ExternalLink size={18} aria-hidden="true" />
                    Live Demo
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function SectionHeading({ icon: Icon, title, number }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <Icon
        size={20}
        aria-hidden="true"
        className="text-cyan-400"
      />

      <span className="font-mono text-xs text-purple-400">
        {number}
      </span>

      <h3 className="text-xl font-bold text-white sm:text-2xl">
        {title}
      </h3>
    </div>
  );
}

function InfoCard({ label, title, text, color }) {
  const accent =
    color === "purple"
      ? "border-purple-400/20 bg-purple-400/5 text-purple-300"
      : "border-cyan-400/20 bg-cyan-400/5 text-cyan-300";

  return (
    <div className={`rounded-2xl border p-6 ${accent}`}>
      <p className="mb-3 font-mono text-xs tracking-widest">
        {label}
      </p>

      <h3 className="mb-4 text-xl font-bold text-white">
        {title}
      </h3>

      <p className="leading-7 text-gray-300">
        {text}
      </p>
    </div>
  );
}