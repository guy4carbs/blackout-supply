"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/* φ = 1.618 — used for die geometry and motion
   Fibonacci: 8, 13, 21, 34, 55 — used for counts and segments */

function DiceMesh({
  autoRotate = true,
  glowIntensity = 1,
  color = "#00F5FF",
}: {
  autoRotate?: boolean;
  glowIntensity?: number;
  color?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const pipPositions = useMemo(() => {
    const size = 0.809;    // 1.618 / 2 — half of golden ratio die
    const offset = 0.309;  // size × φ⁻² (0.809 × 0.382)
    const faces: THREE.Vector3[][] = [
      // Face 1 (front, z+) - 1 pip
      [new THREE.Vector3(0, 0, size)],
      // Face 6 (back, z-) - 6 pips
      [
        new THREE.Vector3(-offset, offset, -size),
        new THREE.Vector3(-offset, 0, -size),
        new THREE.Vector3(-offset, -offset, -size),
        new THREE.Vector3(offset, offset, -size),
        new THREE.Vector3(offset, 0, -size),
        new THREE.Vector3(offset, -offset, -size),
      ],
      // Face 2 (right, x+) - 2 pips
      [
        new THREE.Vector3(size, offset, offset),
        new THREE.Vector3(size, -offset, -offset),
      ],
      // Face 5 (left, x-) - 5 pips
      [
        new THREE.Vector3(-size, 0, 0),
        new THREE.Vector3(-size, offset, offset),
        new THREE.Vector3(-size, -offset, -offset),
        new THREE.Vector3(-size, offset, -offset),
        new THREE.Vector3(-size, -offset, offset),
      ],
      // Face 3 (top, y+) - 3 pips
      [
        new THREE.Vector3(0, size, 0),
        new THREE.Vector3(offset, size, offset),
        new THREE.Vector3(-offset, size, -offset),
      ],
      // Face 4 (bottom, y-) - 4 pips
      [
        new THREE.Vector3(-offset, -size, offset),
        new THREE.Vector3(offset, -size, offset),
        new THREE.Vector3(-offset, -size, -offset),
        new THREE.Vector3(offset, -size, -offset),
      ],
    ];
    return faces.flat();
  }, []);

  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.00382;  // φ⁻³ scaled
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.236) * 0.0618;
    }
    if (glowRef.current && autoRotate) {
      glowRef.current.rotation.y += 0.00382;
      glowRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.236) * 0.0618;
    }
  });

  return (
    <group>
      {/* Main dice body — φ geometry */}
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[1.618, 1.618, 1.618]} />
        <meshStandardMaterial
          color="#111118"
          roughness={0.15}
          metalness={0.3}
          emissive={color}
          emissiveIntensity={0.05 * glowIntensity}
        />
      </mesh>

      {/* Glow outline — scale 1 + 1/34 (Fibonacci) */}
      <mesh ref={glowRef} scale={1.03}>
        <boxGeometry args={[1.618, 1.618, 1.618]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.08 * glowIntensity}
          emissive={color}
          emissiveIntensity={0.5 * glowIntensity}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Pips — 21 sphere segments (Fibonacci) */}
      {pipPositions.map((pos, i) => (
        <mesh key={i} position={pos} rotation={meshRef.current?.rotation ?? new THREE.Euler()}>
          <sphereGeometry args={[0.1, 21, 21]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2 * glowIntensity}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Point lights for glow effect */}
      <pointLight color={color} intensity={2 * glowIntensity} distance={5} decay={2} />
    </group>
  );
}

/* 55 particles (Fibonacci) in golden-angle phyllotaxis spiral */
function Particles({ count = 55, color = "#00F5FF" }: { count?: number; color?: string }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // 137.5° in radians
    for (let i = 0; i < count; i++) {
      const theta = goldenAngle * i;
      const y = 1 - (i / (count - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const radius = 5;
      pos[i * 3] = Math.cos(theta) * radiusAtY * radius;
      pos[i * 3 + 1] = y * radius;
      pos[i * 3 + 2] = Math.sin(theta) * radiusAtY * radius;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01618; // φ/100
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.00618) * 0.0618;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color={color} size={0.021} transparent opacity={0.618} sizeAttenuation />
    </points>
  );
}

export default function GlowDice({
  className = "",
  glowIntensity = 1,
  color = "#00F5FF",
  interactive = false,
}: {
  className?: string;
  glowIntensity?: number;
  color?: string;
  interactive?: boolean;
}) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} />

        <Float speed={1.618} rotationIntensity={interactive ? 0 : 0.382} floatIntensity={0.382}>
          <DiceMesh
            autoRotate={!interactive}
            glowIntensity={glowIntensity}
            color={color}
          />
        </Float>

        <Particles color={color} />

        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.382}
          scale={10}
          blur={2}
          color={color}
        />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
