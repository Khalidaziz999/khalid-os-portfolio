import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";

import { education } from "../../../data/education";
import EducationCard from "./EducationCard";

export default function EducationSection() {
  return (
    <section
      id="education"
      className="relative overflow-hidden bg-[#050816] px-6 py-28"
    >
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p className="mb-4 text-sm tracking-[0.3em] text-cyan-400">
            05 / ACADEMIC JOURNEY
          </p>

          <h2 className="text-4xl font-extrabold text-white md:text-6xl">
            EDUCATION{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              PATH
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            A structured academic path from scientific foundations
            to specialized studies in networks, cloud and cybersecurity.
          </p>
        </motion.div>

        <div className="relative">

          {/* Timeline Line */}
          <div className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent md:left-8" />

          <div className="space-y-10">
            {education.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
                className="relative pl-12 md:pl-20"
              >
                <div className="absolute left-3 top-8 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-400/40 bg-[#050816] text-cyan-400 md:left-8">
                  <GraduationCap size={16} />
                </div>

                <EducationCard item={item} />
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}