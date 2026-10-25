import {
  Building2,
  CalendarDays,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export default function ExperienceCard({ experience }) {
  return (
    <article className="experience-card relative rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-400/40 md:p-9">

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">

        <div>
          <div className="mb-4 flex items-center gap-3 text-cyan-400">
            <Building2 size={22} />

            <span className="font-mono text-xs uppercase tracking-widest">
              {experience.type}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white">
            {experience.role}
          </h3>

          <p className="mt-2 text-lg font-medium text-cyan-400">
            {experience.company}
          </p>
        </div>

        <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-400">
          <CalendarDays size={16} className="mr-2 inline" />
          {experience.period}
        </div>

      </div>

      {/* Location */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
        <MapPin size={16} />
        {experience.location}
      </div>

      {/* Description */}
      <p className="mb-7 leading-7 text-gray-400">
        {experience.description}
      </p>

      {/* Responsibilities */}
      <div className="mb-8 space-y-4">

        {experience.responsibilities.map((item) => (
          <div key={item} className="flex items-start gap-3">

            <CheckCircle2
              size={18}
              className="mt-1 shrink-0 text-cyan-400"
            />

            <p className="text-sm leading-6 text-gray-300">
              {item}
            </p>

          </div>
        ))}

      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 border-t border-white/10 pt-6">

        {experience.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-2 text-xs text-purple-300"
          >
            {tech}
          </span>
        ))}

      </div>

    </article>
  );
}