import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import {
  Shield,
  Network,
  Terminal,
  Cloud,
  Code2,
  Cpu,
} from "lucide-react";

import { skillCategories } from "../../../data/skills";
import SkillCard from "./SkillCard";

const categoryIcons = {
  Shield,
  Network,
  Terminal,
  Cloud,
  Code: Code2,
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] =
    useState("security");

  const selectedCategory = skillCategories.find(
    (category) => category.id === activeCategory
  );

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#050816] px-6 py-28"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm tracking-[0.3em] text-cyan-400">
            02 / TECH ECOSYSTEM
          </p>

          <h2 className="text-4xl font-extrabold text-white md:text-6xl">
            TECH{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              ARSENAL
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            Technologies and tools I use to build, manage and
            secure modern digital infrastructures.
          </p>
        </motion.div>

        {/* Category Navigation */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">

          {skillCategories.map((category) => {
            const Icon = categoryIcons[category.icon];

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={activeCategory === category.id}
                className={`flex items-center gap-3 rounded-xl border px-5 py-3 text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                  : "border-white/10 bg-white/5 text-gray-400 hover:border-cyan-400/30 hover:text-white"
                  }`}
              >
                <Icon size={18} />

                {category.title}
              </button>
            );
          })}

        </div>

        {/* Skills Display */}
        <AnimatePresence mode="wait">
          {selectedCategory && (
            <motion.div
              key={selectedCategory.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-5xl"
            >
              {/* Category Header */}
              <div className="mb-8 flex items-center gap-4 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">

                <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                  <Cpu size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedCategory.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {selectedCategory.description}
                  </p>
                </div>

              </div>

              {/* Skills Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {selectedCategory.skills.map((skill, index) => (
                  <SkillCard
                    key={skill}
                    skill={skill}
                    index={index}
                  />
                ))}

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}