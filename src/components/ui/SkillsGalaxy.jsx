import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Network, Shield, Cloud, Code2 } from "lucide-react";

import { skillsGalaxy } from "../../data/skillsGalaxy";

const icons = {
  network: Network,
  security: Shield,
  cloud: Cloud,
  development: Code2,
};

export default function SkillsGalaxy() {
  const [activeId, setActiveId] = useState("network");

  const reduceMotion = useReducedMotion();

  const activeGalaxy = skillsGalaxy.find(
    (item) => item.id === activeId
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">

      {/* =====================================
          GALAXY MAP
      ===================================== */}

      <div
        className="
          relative min-h-[420px]
          overflow-hidden rounded-3xl
          border border-white/10
          bg-[#030712]
          sm:min-h-[520px]
        "
      >
        {/* Background glows */}

        <div className="pointer-events-none absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />

        {/* Grid */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,229,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* SVG Connections */}

        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {skillsGalaxy.map((galaxy, index) => {
            const next = skillsGalaxy[(index + 1) % skillsGalaxy.length];

            return (
              <motion.line
                key={galaxy.id}
                x1={galaxy.position.x}
                y1={galaxy.position.y}
                x2={next.position.x}
                y2={next.position.y}
                stroke={galaxy.color}
                strokeWidth="0.25"
                strokeOpacity="0.45"
                strokeDasharray="1 1"
                initial={
                  reduceMotion
                    ? false
                    : { pathLength: 0, opacity: 0 }
                }
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              />
            );
          })}

          {/* Center connections */}

          {skillsGalaxy.map((galaxy) => (
            <line
              key={`center-${galaxy.id}`}
              x1="50"
              y1="50"
              x2={galaxy.position.x}
              y2={galaxy.position.y}
              stroke={galaxy.color}
              strokeWidth="0.2"
              strokeOpacity="0.2"
            />
          ))}
        </svg>

        {/* Center core */}

        <div
          className="
            pointer-events-none
            absolute left-1/2 top-1/2
            flex h-20 w-20
            -translate-x-1/2 -translate-y-1/2
            items-center justify-center
            rounded-full
            border border-cyan-400/30
            bg-cyan-400/10
            shadow-[0_0_45px_rgba(0,229,255,0.15)]
          "
        >
          <div className="text-center">
            <span className="block text-sm font-black text-white">
              K.OS
            </span>

            <span className="block text-[8px] tracking-widest text-cyan-400">
              CORE
            </span>
          </div>
        </div>

        {/* Interactive planets */}

        {skillsGalaxy.map((galaxy) => {
          const Icon = icons[galaxy.id];

          const selected = activeId === galaxy.id;

          return (
            <motion.button
              key={galaxy.id}
              type="button"
              onClick={() => setActiveId(galaxy.id)}
              aria-pressed={selected}
              aria-label={`Explore ${galaxy.name} skills`}
              whileHover={reduceMotion ? undefined : { scale: 1.1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                    y: [0, -6, 0],
                  }
              }
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              style={{
                left: `${galaxy.position.x}%`,
                top: `${galaxy.position.y}%`,
                borderColor: selected
                  ? galaxy.color
                  : `${galaxy.color}55`,
                boxShadow: selected
                  ? `0 0 35px ${galaxy.color}55`
                  : `0 0 15px ${galaxy.color}22`,
              }}
              className="
                absolute z-10
                flex h-20 w-20
                -translate-x-1/2 -translate-y-1/2
                flex-col items-center justify-center
                rounded-full border
                bg-[#0B1020]/95
                backdrop-blur-xl
                transition-colors
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-cyan-400
                sm:h-24 sm:w-24
              "
            >
              <Icon
                size={25}
                style={{ color: galaxy.color }}
              />

              <span className="mt-2 text-[9px] font-bold text-white sm:text-[10px]">
                {galaxy.name}
              </span>
            </motion.button>
          );
        })}

        {/* Bottom label */}

        <div className="pointer-events-none absolute bottom-5 left-5 font-mono text-[10px] tracking-widest text-gray-600">
          KHALID.OS // SKILL UNIVERSE
        </div>
      </div>

      {/* =====================================
          SKILL DETAILS PANEL
      ===================================== */}

      <div
        className="
          overflow-hidden rounded-3xl
          border border-white/10
          bg-[#0B1020]/80
          p-6 backdrop-blur-xl
          sm:p-8
        "
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="font-mono text-xs tracking-widest text-gray-500">
            GALAXY EXPLORER
          </span>

          <span className="flex items-center gap-2 font-mono text-xs text-green-400">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            ONLINE
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeGalaxy.id}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 15 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, y: -15 }
            }
            transition={{ duration: 0.3 }}
          >
            <div
              className="mb-6 h-1 w-16 rounded-full"
              style={{
                backgroundColor: activeGalaxy.color,
                boxShadow: `0 0 20px ${activeGalaxy.color}88`,
              }}
            />

            <h3 className="mb-3 text-2xl font-bold text-white">
              {activeGalaxy.name}
            </h3>

            <p className="mb-8 text-sm text-gray-400">
              {activeGalaxy.subtitle}
            </p>

            <div className="space-y-3">
              {activeGalaxy.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, x: -10 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: reduceMotion ? 0 : index * 0.05,
                  }}
                  className="
                    flex items-center gap-3
                    rounded-xl border border-white/10
                    bg-white/[0.03]
                    px-4 py-3
                    text-sm text-gray-300
                    transition-colors
                    hover:border-cyan-400/20
                  "
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: activeGalaxy.color,
                    }}
                  />

                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}