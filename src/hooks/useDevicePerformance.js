import { useEffect, useState } from "react";

export default function useDevicePerformance() {
  const [settings, setSettings] = useState(() => {
    if (typeof window === "undefined") {
      return {
        isMobile: false,
        reducedMotion: false,
      };
    }

    return {
      isMobile: window.matchMedia("(max-width: 767px)").matches,
      reducedMotion: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches,
    };
  });

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => {
      setSettings({
        isMobile: mobileQuery.matches,
        reducedMotion: motionQuery.matches,
      });
    };

    mobileQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);

    return () => {
      mobileQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return settings;
}