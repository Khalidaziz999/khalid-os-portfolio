import { CalendarDays, MapPin, CheckCircle2 } from "lucide-react";

export default function EducationCard({ item }) {
  const isInProgress = item.status === "in-progress";

  return (
    <article className="relative rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-400/40 md:p-8">

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">

        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
            {item.degree}
          </p>

          <h3 className="text-2xl font-bold text-white">
            {item.field}
          </h3>

          <p className="mt-2 text-gray-300">
            {item.school}
          </p>
        </div>

        <span
          className={`rounded-full border px-4 py-2 text-xs font-semibold ${isInProgress
            ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-400"
            : "border-green-400/30 bg-green-400/10 text-green-400"
            }`}
        >
          {isInProgress ? "IN PROGRESS" : "COMPLETED"}
        </span>

      </div>

      <div className="mb-6 flex flex-wrap gap-5 text-sm text-gray-400">

        <span className="inline-flex items-center gap-2">
          <CalendarDays size={16} />
          {item.period}
        </span>

        <span className="inline-flex items-center gap-2">
          <MapPin size={16} />
          {item.location}
        </span>

      </div>

      <p className="mb-6 leading-7 text-gray-400">
        {item.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {item.highlights.map((highlight) => (
          <span
            key={highlight}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300"
          >
            <CheckCircle2 size={14} className="text-cyan-400" />
            {highlight}
          </span>
        ))}
      </div>

    </article>
  );
}