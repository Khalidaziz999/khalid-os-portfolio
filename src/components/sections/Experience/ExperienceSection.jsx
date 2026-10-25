import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { experiences } from "../../../data/experience";
import ExperienceCard from "./ExperienceCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ExperienceSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".experience-card");

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",

            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      gsap.fromTo(
        ".timeline-progress",
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          ease: "none",

          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 75%",
            end: "bottom 75%",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050816] px-6 py-28"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-20 text-center">

          <p className="mb-4 text-sm tracking-[0.3em] text-cyan-400">
            04 / PROFESSIONAL JOURNEY
          </p>

          <h2 className="text-4xl font-extrabold text-white md:text-6xl">
            MY{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              EXPERIENCE
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            From academic knowledge to real-world experience,
            exploring cybersecurity, networking and software development.
          </p>

        </div>

        {/* Timeline */}
        <div className="timeline-container relative">

          {/* Timeline Background Line */}
          <div className="absolute bottom-0 left-3 top-0 w-px bg-white/10 md:left-1/2" />

          {/* Animated Timeline Line */}
          <div className="timeline-progress absolute bottom-0 left-3 top-0 w-px origin-top bg-gradient-to-b from-cyan-400 to-purple-500 md:left-1/2" />

          {/* Experience Items */}
          <div className="space-y-16">

            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className={`relative flex w-full ${index % 2 === 0
                  ? "md:justify-start"
                  : "md:justify-end"
                  }`}
              >

                {/* Timeline Dot */}
                <div className="absolute left-3 top-10 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#050816] bg-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.5)] md:left-1/2" />

                {/* Card */}
                <div className="ml-10 w-[calc(100%-2.5rem)] md:ml-0 md:w-[46%]">
                  <ExperienceCard experience={experience} />
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}