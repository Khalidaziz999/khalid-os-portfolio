import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Award, GraduationCap } from "lucide-react";

import { certifications } from "../../../data/certifications";
import CertificationCard from "./CertificationCard";

const filters = [
  { id: "all", label: "All Documents" },
  { id: "certification", label: "Certifications" },
  { id: "diploma", label: "Diplomas" },
];

export default function CertificationsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const filteredCertificates =
    activeFilter === "all"
      ? certifications
      : certifications.filter(
        (item) => item.category === activeFilter
      );

  useEffect(() => {
    if (!selectedCertificate) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedCertificate(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedCertificate]);

  return (
    <section
      id="certifications"
      className="relative bg-[#050816] px-6 py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="mb-4 text-sm tracking-[0.3em] text-cyan-400">
            06 / CREDENTIALS & DIPLOMAS
          </p>

          <h2 className="text-4xl font-extrabold text-white md:text-6xl">
            ACHIEVEMENTS{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              VAULT
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            Explore my professional certifications and academic achievements
            in cybersecurity, networking and artificial intelligence.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={activeFilter === filter.id}
              className={`rounded-xl border px-6 py-3 text-sm font-medium transition-all ${activeFilter === filter.id
                ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                : "border-white/10 bg-white/5 text-gray-400 hover:border-cyan-400/30 hover:text-white"
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((certification) => (
              <CertificationCard
                key={certification.id}
                certification={certification}
                onSelect={() => setSelectedCertificate(certification)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Counter */}
        <p className="mt-10 text-center font-mono text-sm text-gray-500">
          Showing {filteredCertificates.length} of {certifications.length} documents
        </p>

      </div>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={selectedCertificate.title}
              className="relative w-full max-w-5xl rounded-2xl border border-cyan-400/20 bg-[#0a1025] p-5 md:p-8"
            >
              {/* Close */}
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                aria-label="Close document"
                className="absolute right-4 top-4 z-10 rounded-full bg-black/70 p-3 text-white transition hover:bg-red-500"
              >
                <X size={22} />
              </button>

              {/* Document Image */}
              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
                className="max-h-[70vh] w-full object-contain"
              />

              {/* Details */}
              <div className="mt-6 text-center">
                <div className="mb-3 flex justify-center text-cyan-400">
                  {selectedCertificate.category === "diploma" ? (
                    <GraduationCap size={26} />
                  ) : (
                    <Award size={26} />
                  )}
                </div>

                <h3 className="text-xl font-bold text-white">
                  {selectedCertificate.title}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  {selectedCertificate.issuer}
                </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}