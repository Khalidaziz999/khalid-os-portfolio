import { motion } from "motion/react";
import { Orbit } from "lucide-react";

import SkillsGalaxy from "../../ui/SkillsGalaxy";

export default function SkillsGalaxySection() {
  return (
    <section
      id="skills-galaxy"
      className="relative overflow-hidden bg-[#050816] px-6 py-28"
    >
      {/* Aurora background */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-purple-400">
            <Orbit size={14} />

            EXPLORE MY TECHNICAL UNIVERSE
          </div>

          <h2 className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            SKILLS{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              GALAXY
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
            Navigate through my technical universe.
            Select a domain to discover the technologies,
            tools, and skills behind my projects.
          </p>
        </motion.div>

        <SkillsGalaxy />
      </div>
    </section>
  );
}