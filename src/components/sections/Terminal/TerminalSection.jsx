import { motion } from "motion/react";
import { Cpu, ShieldCheck } from "lucide-react";

import CyberTerminal from "../../ui/CyberTerminal";

export default function TerminalSection() {
  return (
    <section
      id="terminal"
      className="
        relative overflow-hidden
        bg-[#050816]
        px-6 py-28
      "
    >
      {/* Background glows */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-0 top-1/4
          h-96 w-96
          rounded-full bg-cyan-500/5
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-0 right-0
          h-96 w-96
          rounded-full bg-purple-500/5
          blur-[120px]
        "
      />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Section heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div
            className="
              mb-5 inline-flex items-center gap-2
              rounded-full border border-cyan-500/20
              bg-cyan-500/5 px-4 py-2
              text-xs font-medium uppercase
              tracking-[0.2em] text-cyan-400
            "
          >
            <Cpu size={14} />

            SYSTEM ACCESS
          </div>

          <h2
            className="
              mb-5 text-4xl font-bold
              tracking-tight text-white
              sm:text-5xl
            "
          >
            CYBER{" "}
            <span
              className="
                bg-gradient-to-r
                from-cyan-400 via-blue-400 to-purple-500
                bg-clip-text text-transparent
              "
            >
              TERMINAL
            </span>
          </h2>

          <p
            className="
              mx-auto max-w-2xl
              text-base leading-relaxed
              text-gray-400 md:text-lg
            "
          >
            Access my digital command center.
            Explore my skills, projects, and experience
            through an interactive terminal interface.
          </p>
        </motion.div>

        {/* Terminal */}

        <CyberTerminal />

        {/* Security note */}

        <div
          className="
            mt-8 flex items-center justify-center
            gap-2 text-center text-xs text-gray-500
          "
        >
          <ShieldCheck size={15} className="text-green-400" />

          Safe command simulation — no system commands are executed.
        </div>
      </div>
    </section>
  );
}