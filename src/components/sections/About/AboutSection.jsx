import { useState } from "react";
import AuroraBackground from "../../ui/AuroraBackground";

const specializations = [
  {
    id: "network",
    icon: "🌐",
    title: "Network Engineering",
    description:
      "Designing, configuring and understanding secure network infrastructures using TCP/IP, VLANs, routing and switching.",
    technologies: ["TCP/IP", "VLAN", "Cisco", "GNS3"],
  },
  {
    id: "cloud",
    icon: "☁️",
    title: "Cloud & Virtualization",
    description:
      "Exploring cloud infrastructure, virtualization technologies and Linux-based environments.",
    technologies: ["Cloud Computing", "VMware", "VirtualBox", "Linux"],
  },
  {
    id: "security",
    icon: "🛡️",
    title: "Cybersecurity",
    description:
      "Building security monitoring solutions and exploring intrusion detection, log analysis and network defense.",
    technologies: ["Wazuh", "IDS/IPS", "SIEM", "Linux"],
  },
];

export default function AboutSection() {
  const [activeSpecialization, setActiveSpecialization] =
    useState("security");

  const selectedSpecialization = specializations.find(
    (item) => item.id === activeSpecialization
  );

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#050816] px-6 py-28"
    >
      <AuroraBackground intensity="low" />

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-16 text-center">

          <p className="mb-4 text-sm tracking-[0.3em] text-cyan-400">
            01 / SYSTEM PROFILE
          </p>

          <h2 className="text-4xl font-extrabold text-white md:text-6xl">
            BEYOND THE{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              CODE
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            Discover the person behind the systems, networks and security solutions.
          </p>

        </div>

        <div className="grid items-start gap-12 lg:grid-cols-2">

          {/* Left: Profile Card */}
          <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">

            <div className="mb-8 flex items-center gap-3">

              <span className="h-3 w-3 animate-pulse rounded-full bg-green-400" />

              <span className="font-mono text-sm text-green-400">
                SYSTEM PROFILE // VERIFIED
              </span>

            </div>

            <h3 className="mb-6 text-3xl font-bold text-white">
              Khalid Aziz
            </h3>

            <p className="mb-8 leading-8 text-gray-400">
              I am a Network, Cloud & Cybersecurity Engineering student
              at the École Supérieure de Technologie de Kelaâ des Sraghna.

              Passionate about Linux administration, network infrastructure,
              cloud computing and cybersecurity.

              I develop practical skills through academic projects,
              internships and hands-on security labs.
            </p>

            {/* Profile Information */}
            <div className="space-y-5 border-t border-white/10 pt-8">

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Location</span>
                <span className="text-right text-white">
                  EL Kelaa Des Sraghna | Marrakech-Safi, Morocco
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Education</span>
                <span className="text-right text-white">
                  Bachelor's Degree — In Progress
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Specialization</span>
                <span className="text-right text-cyan-400">
                  Networks • Cloud • Security
                </span>
              </div>

            </div>

          </div>

          {/* Right: Interactive Specializations */}
          <div>

            <h3 className="mb-6 text-2xl font-bold text-white">
              My Areas of Focus
            </h3>

            {/* Specialization Buttons */}
            <div className="mb-8 grid gap-3 sm:grid-cols-3">

              {specializations.map((item) => (

                <button
                  key={item.id}
                  onClick={() => setActiveSpecialization(item.id)}
                  className={`rounded-xl border p-4 text-left transition-all duration-300 ${activeSpecialization === item.id
                    ? "border-cyan-400 bg-cyan-400/10"
                    : "border-white/10 bg-white/5 hover:border-cyan-400/30"
                    }`}
                >

                  <span className="mb-3 block text-3xl">
                    {item.icon}
                  </span>

                  <span className="text-sm font-semibold text-white">
                    {item.title}
                  </span>

                </button>

              ))}

            </div>

            {/* Dynamic Information */}
            {selectedSpecialization && (

              <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-8">

                <p className="mb-3 font-mono text-xs text-purple-400">
                  ACTIVE MODULE
                </p>

                <h4 className="mb-4 text-2xl font-bold text-white">
                  {selectedSpecialization.title}
                </h4>

                <p className="mb-6 leading-7 text-gray-400">
                  {selectedSpecialization.description}
                </p>

                <div className="flex flex-wrap gap-3">

                  {selectedSpecialization.technologies.map((tech) => (

                    <span
                      key={tech}
                      className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400"
                    >
                      {tech}
                    </span>

                  ))}

                </div>

              </div>

            )}

          </div>

        </div>

      </div>
    </section>
  );
}