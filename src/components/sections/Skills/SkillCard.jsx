import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export default function SkillCard({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
      }}
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-cyan-400/40"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
        <CheckCircle2 size={22} />
      </div>

      <span className="font-medium text-white transition-colors group-hover:text-cyan-400">
        {skill}
      </span>
    </motion.div>
  );
}