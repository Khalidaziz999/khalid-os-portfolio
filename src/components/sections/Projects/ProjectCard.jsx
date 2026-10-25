import { motion } from "motion/react";

import {
  ArrowUpRight,
  ExternalLink,
  Code2,
} from "lucide-react";

export default function ProjectCard({ project, index }) {
  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: index * 0.08,
        }}
        whileHover={{ y: -8 }}
        className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-400/40 ${project.featured ? "lg:col-span-2" : ""
          }`}
      >

        {/* Project Screenshot */}
        <div className="relative h-64 overflow-hidden border-b border-white/10 bg-[#0a1025]">

          <img
            src={project.image}
            width={800}
            height={450}
            alt={`${project.title} Screenshot`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/80 via-transparent to-transparent" />

          {/* Featured Badge */}
          {project.featured && (
            <span className="absolute left-5 top-5 rounded-full border border-cyan-400/30 bg-[#050816]/80 px-4 py-2 text-xs font-semibold text-cyan-400 backdrop-blur-md">
              ⭐ FLAGSHIP PROJECT
            </span>
          )}

        </div>

        {/* Project Content */}
        <div className="p-7">

          {/* Category */}
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan-400">
            {project.category}
          </p>

          {/* Title */}
          <h3 className="mb-4 text-2xl font-bold text-white transition-colors group-hover:text-cyan-400">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mb-6 leading-7 text-gray-400">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-8 flex flex-wrap gap-2">

            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300"
              >
                {tech}
              </span>
            ))}

          </div>

          {/* Project Actions */}
          <div className="flex flex-wrap items-center gap-5 border-t border-white/10 pt-6">

            <a
              href={`#project-${project.id}`}
              className="inline-flex items-center gap-2 font-semibold text-cyan-400 transition hover:gap-3"
            >
              Explore Project
              <ArrowUpRight size={18} />
            </a>

            {/* GitHub */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 transition hover:text-white"
              >
                <Code2 size={18} />
                Source Code
              </a>
            )}

            {/* Live Demo */}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 transition hover:text-cyan-400"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}

          </div>

        </div>

      </motion.article>

    </>
  );
}