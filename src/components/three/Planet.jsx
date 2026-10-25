import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Planet({
  radius = 4,
  speed = 0.3,
  size = 0.3,
  color = "#3B82F6",
  offset = 0,
}) {
  const orbitRef = useRef();
  const planetRef = useRef();

  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y =
        state.clock.elapsedTime * speed + offset;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh position={[radius, 0, 0]} ref={planetRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Glow ring */}
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[size * 1.5, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          blending={2}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}