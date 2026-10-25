import AnimatedCounter from "./AnimatedCounter";

const stats = [
  {
    end: 5,
    suffix: "",
    label: "Projects",
  },
  {
    end: 2,
    suffix: "",
    label: "Internships",
  },
  {
    end: 6,
    suffix: "",
    label: "Certifications",
  },
  {
    end: 3,
    suffix: "",
    label: "Education Milestones",
  },
];

export default function StatsBar() {
  return (
    <div className="pointer-events-auto mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#050816]/50 px-4 py-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(0,229,255,0.12)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-pink-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative z-10">
            <div className="text-3xl font-bold sm:text-4xl">
              <AnimatedCounter
                end={stat.end}
                suffix={stat.suffix}
                className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
              />
            </div>

            <p className="mt-3 text-xs font-medium uppercase tracking-wider text-gray-400 sm:text-sm">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}