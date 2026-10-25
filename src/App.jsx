import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import CustomCursor from "./components/ui/CustomCursor";
import BootScreen from "./components/ui/BootScreen";
import SectionLoader from "./components/ui/SectionLoader";
import { lazy, Suspense } from "react";

import HeroSection from "./components/sections/Hero/HeroSection";
import AboutSection from "./components/sections/About/AboutSection";
import SkillsSection from "./components/sections/Skills/SkillsSection";
import ProjectsSection from "./components/sections/Projects/ProjectsSection";
import ExperienceSection from "./components/sections/Experience/ExperienceSection";
import EducationSection from "./components/sections/Education/EducationSection";
import CertificationsSection from "./components/sections/Certifications/CertificationsSection";
import ContactSection from "./components/sections/Contact/ContactSection";
const TerminalSection = lazy(
  () => import("./components/sections/Terminal/TerminalSection")
);

const CyberGuardSection = lazy(
  () => import("./components/sections/CyberGuard/CyberGuardSection")
);

const SkillsGalaxySection = lazy(
  () => import("./components/sections/SkillsGalaxy/SkillsGalaxySection")
);



export default function App() {
  return (
    <>
      <BootScreen />
      <CustomCursor />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <Suspense fallback={<SectionLoader />}>
          <SkillsGalaxySection />
        </Suspense>
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <Suspense fallback={<SectionLoader />}>
          <TerminalSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <CyberGuardSection />
        </Suspense>
        <ContactSection />
      </main>
      <main id="main-content" tabIndex={-1}></main>

      <Footer />
    </>
  );
}