import SmartCyberUniverse from "../../three/SmartCyberUniverse";
import Typewriter from "../../ui/Typewriter";
import Spotlight from "../../ui/Spotlight";
import StatsBar from "../../ui/StatsBar";
import MagneticButton from "../../ui/MagneticButton";
import ScrollIndicator from "../../ui/ScrollIndicator";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="
        relative flex min-h-screen
        items-center justify-center
        overflow-hidden
        bg-[#050816]
        px-6 pb-20 pt-32
      "
    >
      {/* =====================================
          3D CYBER GALAXY
      ===================================== */}

      <SmartCyberUniverse />

      {/* =====================================
          INTERACTIVE SPOTLIGHT
      ===================================== */}

      <Spotlight />

      {/* =====================================
          COSMIC BACKGROUND GLOWS
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute left-1/4 top-1/4
          z-0 h-96 w-96
          rounded-full bg-cyan-500/10
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute bottom-1/4 right-1/4
          z-0 h-96 w-96
          rounded-full bg-purple-500/10
          blur-[120px]
        "
      />

      {/* =====================================
          DARK OVERLAY
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute inset-0 z-0
          bg-gradient-to-b
          from-[#050816]/40
          via-[#050816]/55
          to-[#050816]/90
        "
      />

      {/* =====================================
          HERO CONTENT
      ===================================== */}

      <div
        className="
          pointer-events-none
          relative z-10
          mx-auto w-full max-w-5xl
          text-center
        "
      >
        {/* STATUS BADGE */}

        <div
          className="
            mb-8 inline-flex
            items-center gap-3
            rounded-full
            border border-cyan-500/20
            bg-cyan-500/5
            px-5 py-2
            backdrop-blur-md
          "
        >
          <span
            className="
              h-2 w-2
              animate-pulse
              rounded-full
              bg-cyan-400
              shadow-[0_0_15px_#00E5FF]
            "
          />

          <span className="text-xs tracking-[0.2em] text-cyan-400 sm:text-sm">
            WELCOME TO MY DIGITAL UNIVERSE
          </span>
        </div>

        {/* TYPEWRITER INTRODUCTION */}

        <p className="mb-5 min-h-8 text-base text-gray-400 sm:text-lg">
          Hello World, I'm{" "}
          <Typewriter
            texts={[
              "a Network Engineering Student",
              "a Cloud Enthusiast",
              "a Cybersecurity Defender",
              "KHALID AZIZ",
            ]}
            className="font-semibold text-cyan-400"
          />
        </p>

        {/* NAME */}

        <h1
          className="
            mb-6
            text-5xl font-extrabold
            tracking-tight text-white
            sm:text-7xl
            md:text-8xl
          "
        >
          KHALID{" "}
          <span
            className="
              bg-gradient-to-r
              from-cyan-400
              via-blue-500
              to-purple-500
              bg-clip-text
              text-transparent
            "
          >
            AZIZ
          </span>
        </h1>

        {/* SPECIALIZATION */}

        <h2
          className="
            mb-6
            text-xl font-semibold
            text-gray-200
            md:text-3xl
          "
        >
          Network
          <span className="mx-3 text-cyan-400">•</span>
          Cloud
          <span className="mx-3 text-purple-400">•</span>
          Cybersecurity
        </h2>

        {/* DESCRIPTION */}

        <p
          className="
            mx-auto mb-10
            max-w-2xl
            text-base leading-relaxed
            text-gray-400
            md:text-lg
          "
        >
          Network, Cloud & Cybersecurity Engineering Student.
          Passionate about building secure infrastructures,
          exploring cloud technologies, and defending digital systems.
        </p>

        {/* =====================================
            MAGNETIC BUTTONS
        ===================================== */}

        <div
          className="
            pointer-events-auto
            flex flex-col
            items-center justify-center
            gap-5 sm:flex-row
          "
        >
          <MagneticButton
            href="#projects"
            variant="primary"
          >
            Explore My Projects
            <span className="ml-2">↗</span>
          </MagneticButton>

          <MagneticButton
            href="/Khalid_Aziz_CV.pdf"
            download
            variant="secondary"
          >
            Download CV
            <span className="ml-2">↓</span>
          </MagneticButton>
        </div>

        {/* =====================================
            ANIMATED STATS
        ===================================== */}

        <StatsBar />

        {/* =====================================
            SOCIAL LINKS
        ===================================== */}

        <div
          className="
            pointer-events-auto
            mt-12 flex
            justify-center gap-8
          "
        >
          <a
            href="https://github.com/Khalidaziz999"
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-gray-400
              transition-colors duration-300
              hover:text-cyan-400
              focus-visible:outline-2
              focus-visible:outline-cyan-400
            "
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/khalid-aziz-a10762353"
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-gray-400
              transition-colors duration-300
              hover:text-purple-400
              focus-visible:outline-2
              focus-visible:outline-cyan-400
            "
          >
            LinkedIn
          </a>
        </div>

        {/* =====================================
    COSMIC SCROLL INDICATOR
===================================== */}

        <div className="pointer-events-auto mt-14 flex justify-center">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}