import { lazy, Suspense, useEffect, useState } from "react";

const CyberUniverse = lazy(() => import("./CyberUniverse"));

function CosmicFallback() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute left-[15%] top-[20%] h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]" />

      <div className="absolute right-[10%] top-[30%] h-96 w-96 rounded-full bg-purple-500/15 blur-[120px]" />

      <div className="absolute bottom-[10%] left-[40%] h-72 w-72 rounded-full bg-pink-500/10 blur-[100px]" />
    </div>
  );
}

export default function SmartCyberUniverse() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Lightweight background on mobile and reduced-motion devices
    if (mobile || reducedMotion) return;

    let timeoutId;
    let idleId;

    const scheduleLoad = () => {
      setShouldLoad(true);
    };

    // Wait before requesting heavy 3D code
    timeoutId = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(scheduleLoad, {
          timeout: 4000,
        });
      } else {
        scheduleLoad();
      }
    }, 2500);

    return () => {
      window.clearTimeout(timeoutId);

      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  if (!shouldLoad) {
    return <CosmicFallback />;
  }

  return (
    <Suspense fallback={<CosmicFallback />}>
      <CyberUniverse />
    </Suspense>
  );
}