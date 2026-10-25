import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Sun({ position = [0, 0, 0] }) {
  const sunRef = useRef();
  const haloRef = useRef();

  useFrame((state, delta) => {
    if (sunRef.current) sunRef.current.rotation.y += delta * 0.3;
    if (haloRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
      haloRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={position}>
      {/* Core */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.9, 64, 64]} />
        <meshBasicMaterial color="#FFF7E6" />
      </mesh>

      {/* Inner glow */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[1.05, 64, 64]} />
        <meshBasicMaterial
          color="#FCD34D"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer halo */}
      <mesh>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial
          color="#F59E0B"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <pointLight color="#FFF7E6" intensity={3} distance={30} decay={2} />
    </group>
  );
}