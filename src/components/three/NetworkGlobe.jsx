import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function NetworkGlobe() {
  const groupRef = useRef();

  const nodes = useMemo(() => {
    const count = 50;
    const points = [];
    const radius = 1.8;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const color = i % 10 < 4 ? "#00E5FF" : i % 10 < 7 ? "#8B5CF6" : "#EC4899";

      points.push({ pos: new THREE.Vector3(x, y, z), color });
    }
    return points;
  }, []);

  const lineGeometry = useMemo(() => {
    const positions = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].pos.distanceTo(nodes[j].pos) < 0.85) {
          positions.push(
            nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z,
            nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z
          );
        }
      }
    }
    return new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
  }, [nodes]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Wireframe sphere */}
      <mesh>
        <sphereGeometry args={[1.82, 32, 32]} />
        <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Dark core */}
      <mesh>
        <sphereGeometry args={[1.78, 32, 32]} />
        <meshBasicMaterial color="#050816" transparent opacity={0.5} />
      </mesh>

      {/* Nodes */}
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color={n.color} />
        </mesh>
      ))}

      {/* Connections */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#00E5FF" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}