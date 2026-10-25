import { Suspense } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

import useDevicePerformance from "../../hooks/useDevicePerformance";

import Galaxy from "./Galaxy";
import Sun from "./Sun";
import Planet from "./Planet";
import AttackBeams from "./AttackBeams";
import NetworkGlobe from "./NetworkGlobe";
import NetworkParticles from "./NetworkParticles";

export default function CyberUniverse() {
  const { isMobile, reducedMotion } = useDevicePerformance();

  // Respect reduced motion preferences
  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-purple-500/10 blur-[100px]" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0"
    >
      <Canvas
        camera={{
          position: isMobile ? [0, 3, 12] : [0, 3, 8],
          fov: isMobile ? 60 : 55,
        }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.4} />

        <pointLight
          position={[0, 0, 0]}
          intensity={2}
          color="#FFF7E6"
        />

        <Suspense fallback={null}>
          {/* Stars */}

          <Stars
            radius={100}
            depth={60}
            count={isMobile ? 800 : 4000}
            factor={4}
            fade
            speed={isMobile ? 0.15 : 0.5}
          />

          {/* Spiral Galaxy */}

          <group position={[0, -1.5, -8]}>
            <Galaxy count={isMobile ? 4000 : 20000} />
          </group>

          {/* Sun */}

          <Sun position={[0, 0, 0]} />

          {/* Planets */}

          <group rotation={[0.3, 0, 0]}>
            <Planet
              radius={3.2}
              speed={0.4}
              size={0.35}
              color="#3B82F6"
            />

            <Planet
              radius={4.5}
              speed={0.28}
              size={0.28}
              color="#8B5CF6"
              offset={2}
            />

            {!isMobile && (
              <>
                <Planet
                  radius={5.8}
                  speed={0.2}
                  size={0.22}
                  color="#EC4899"
                  offset={4}
                />

                <Planet
                  radius={7}
                  speed={0.15}
                  size={0.18}
                  color="#00E5FF"
                  offset={1}
                />
              </>
            )}
          </group>

          {/* Cybersecurity Globe */}

          <group scale={isMobile ? 0.7 : 0.9}>
            <NetworkGlobe />
          </group>

          {/* Simulated Attacks */}

          {!isMobile && <AttackBeams />}

          {/* Space particles */}

          {!isMobile && <NetworkParticles />}
        </Suspense>

        {/* Mouse interaction — desktop only */}

        {!isMobile && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.25}
            enableDamping
            dampingFactor={0.05}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.2}
          />
        )}
      </Canvas>
    </div>
  );
}