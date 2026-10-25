import { motion } from "motion/react";
import { Shield, Activity } from "lucide-react";

import CyberGuardSimulator from "../../ui/CyberGuardSimulator";

export default function CyberGuardSection() {
  return (
    <section
      id="cyberguard"
      className="relative overflow-hidden bg-[#050816] px-6 py-28"
    >
      {/* Background glow */}

      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-red-500/5 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-400/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-red-400">
            <Activity size={14} />
            LIVE THREAT SIMULATION
          </div>

          <h2 className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            CYBERGUARD{" "}
            <span className="bg-gradient-to-r from-red-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              DEFENSE LAB
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
            Experience a simulated Security Operations Center.
            Detect suspicious activity, investigate alerts,
            and respond to threats in an interactive IDS/IPS environment.
          </p>
        </motion.div>

        {/* Simulator */}

        <CyberGuardSimulator />

        {/* Disclaimer */}

        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-gray-500">
          <Shield size={15} className="shrink-0 text-cyan-400" />

          Educational simulation using fictional events and documentation-only IP addresses.
        </div>
      </div>
    </section>
  );
}