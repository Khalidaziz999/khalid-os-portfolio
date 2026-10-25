import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FolderOpen } from "lucide-react";

import AuroraBackground from "../../ui/AuroraBackground";
import { projects } from "../../../data/projects";

import ProjectCard from "./ProjectCard";
import ProjectExplorerModal from "./ProjectExplorerModal";

const filters = [
  { id: "all", label: "All Projects" },
  { id: "security", label: "Cybersecurity" },
  { id: "network", label: "Networking" },
  { id: "web", label: "Web Development" },
  { id: "systems", label: "Systems" },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter(
        (project) => project.category === activeFilter
      );

  const openProject = (project) => {
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <>
      {/* =====================================
          PROJECTS SECTION
      ===================================== */}

      <section
        id="projects"
        className="relative overflow-hidden bg-[#050816] px-6 py-28"
      >
        <AuroraBackground intensity="low" />

        {/* Background Glow */}
        <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl">

          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <p className="mb-4 text-sm tracking-[0.3em] text-cyan-400">
              03 / FEATURED WORK
            </p>

            <h2 className="text-4xl font-extrabold text-white md:text-6xl">
              PROJECT{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                LABORATORY
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-gray-300">
              Engineering security, one project at a time.
              Explore my hands-on projects in cybersecurity,
              networking, infrastructure and web development.
            </p>
          </motion.div>

          {/* =====================================
              PROJECT FILTERS
          ===================================== */}

          <div
            role="group"
            aria-label="Filter projects by category"
            className="mb-12 flex flex-wrap justify-center gap-3"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={activeFilter === filter.id}
                className={`rounded-xl border px-5 py-3 text-sm font-medium transition-all duration-300 ${activeFilter === filter.id
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                  : "border-white/10 bg-white/5 text-gray-300 hover:border-cyan-400/30 hover:text-white"
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* =====================================
              PROJECTS GRID
          ===================================== */}

          <motion.div
            layout
            className="grid gap-8 lg:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onExplore={openProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* =====================================
              PROJECT COUNT
          ===================================== */}

          <div className="mt-12 flex items-center justify-center gap-3 text-sm text-gray-300">
            <FolderOpen size={18} aria-hidden="true" />

            <span>
              Showing {filteredProjects.length} of{" "}
              {projects.length} projects
            </span>
          </div>
        </div>
      </section>

      {/* =====================================
          PREMIUM PROJECT EXPLORER MODAL
          Outside section to avoid clipping
      ===================================== */}

      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectExplorerModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={closeProject}
          />
        )}
      </AnimatePresence>
    </>
  );
}