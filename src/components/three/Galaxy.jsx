import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  attribute float aScale;
  attribute vec3 aColor;
  varying vec3 vColor;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Rotation spirale
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.15;
    angle += angleOffset;

    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    gl_PointSize = aScale * 45.0;
    gl_PointSize *= (1.0 / -viewPosition.z);

    vColor = aColor;
  }
`;

const fragmentShader = `
  varying vec3 vColor;

  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 1.0 - (distanceToCenter * 2.0);
    if (strength < 0.0) discard;
    gl_FragColor = vec4(vColor, strength);
  }
`;

export default function Galaxy({ count = 20000 }) {
  const materialRef = useRef();
  const pointsRef = useRef();

  const { positions, colors, scales } = useMemo(() => {
    const random = (index) => {
      const value = Math.sin((index + 1) * 12.9898 + 78.233) * 43758.5453;
      return value - Math.floor(value);
    };

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    const palette = [
      new THREE.Color("#00E5FF"),
      new THREE.Color("#8B5CF6"),
      new THREE.Color("#EC4899"),
      new THREE.Color("#3B82F6"),
      new THREE.Color("#FFFFFF"),
      new THREE.Color("#F59E0B"),
    ];

    const branches = 5;
    const radius = 12;
    const spin = 1.4;
    const randomness = 0.35;
    const randomnessPower = 3.0;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const randomIndex = i * 9;
      const r = random(randomIndex) * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin;

      const randX =
        Math.pow(random(randomIndex + 1), randomnessPower) *
        (random(randomIndex + 2) < 0.5 ? 1 : -1) *
        randomness *
        r;
      const randY =
        Math.pow(random(randomIndex + 3), randomnessPower) *
        (random(randomIndex + 4) < 0.5 ? 1 : -1) *
        randomness *
        r *
        0.4;
      const randZ =
        Math.pow(random(randomIndex + 5), randomnessPower) *
        (random(randomIndex + 6) < 0.5 ? 1 : -1) *
        randomness *
        r;

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randX;
      positions[i3 + 1] = randY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randZ;

      const c = palette[Math.floor(random(randomIndex + 7) * palette.length)];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      scales[i] = random(randomIndex + 8) * 0.9 + 0.2;
    }

    return { positions, colors, scales };
  }, [count]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value =
        state.clock.elapsedTime * 0.3;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.x = 0.35;
      pointsRef.current.rotation.z = 0.1;
    }
  });

  return (
    <points ref={pointsRef} rotation={[Math.PI * 0.05, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
}