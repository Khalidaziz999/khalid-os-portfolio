import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Beam({ start, end, color, speed, phase }) {
  const ref = useRef();
  const progress = useRef(phase);

  const line = useMemo(() => {
    return new THREE.LineCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(...end)
    );
  }, [start, end]);

  const points = useMemo(() => line.getPoints(2), [line]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    progress.current += delta * speed;
    if (progress.current > 1) progress.current = 0;

    const p = progress.current;
    const scale = Math.sin(p * Math.PI);
    ref.current.scale.set(1, scale, 1);
    ref.current.material.opacity = Math.sin(p * Math.PI) * 0.9;
    ref.current.position.lerpVectors(
      new THREE.Vector3(...start),
      new THREE.Vector3(...end),
      p
    );
  });

  return (
    <primitive ref={ref} object={new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )} />
  );
}

export default function AttackBeams() {
  const attacks = useMemo(() => {
    const arr = [];
    const colors = ["#EF4444", "#F97316", "#EC4899", "#DC2626"];
    const seededRandom = (seed) => {
      const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453123;
      return x - Math.floor(x);
    };

    for (let i = 0; i < 12; i++) {
      const angle = seededRandom(i + 1) * Math.PI * 2;
      const dist = 10 + seededRandom(i + 2) * 4;
      const start = [
        Math.cos(angle) * dist,
        (seededRandom(i + 3) - 0.5) * 6,
        Math.sin(angle) * dist,
      ];
      const end = [
        (seededRandom(i + 4) - 0.5) * 3,
        (seededRandom(i + 5) - 0.5) * 2,
        (seededRandom(i + 6) - 0.5) * 3,
      ];
      arr.push({
        start,
        end,
        color: colors[Math.floor(seededRandom(i + 7) * colors.length)],
        speed: 0.5 + seededRandom(i + 8) * 0.8,
        phase: seededRandom(i + 9),
      });
    }
    return arr;
  }, []);

  return (
    <group>
      {attacks.map((a, i) => (
        <Beam key={i} {...a} />
      ))}
    </group>
  );
}