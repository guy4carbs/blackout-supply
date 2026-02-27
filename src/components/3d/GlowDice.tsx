"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

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
    const size = 0.85;
    const offset = 0.25;
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
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (glowRef.current && autoRotate) {
      glowRef.current.rotation.y += 0.005;
      glowRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group>
      {/* Main dice body */}
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[1.7, 1.7, 1.7]} />
        <meshStandardMaterial
          color="#111118"
          roughness={0.15}
          metalness={0.3}
          emissive={color}
          emissiveIntensity={0.05 * glowIntensity}
        />
      </mesh>

      {/* Glow outline */}
      <mesh ref={glowRef} scale={1.02}>
        <boxGeometry args={[1.7, 1.7, 1.7]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.08 * glowIntensity}
          emissive={color}
          emissiveIntensity={0.5 * glowIntensity}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Pips */}
      {pipPositions.map((pos, i) => (
        <mesh key={i} position={pos} rotation={meshRef.current?.rotation ?? new THREE.Euler()}>
          <sphereGeometry args={[0.1, 16, 16]} />
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

function Particles({ count = 50, color = "#00F5FF" }: { count?: number; color?: string }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color={color} size={0.02} transparent opacity={0.6} sizeAttenuation />
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
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} />

        <Float speed={2} rotationIntensity={interactive ? 0 : 0.5} floatIntensity={0.5}>
          <DiceMesh
            autoRotate={!interactive}
            glowIntensity={glowIntensity}
            color={color}
          />
        </Float>

        <Particles color={color} />

        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.3}
          scale={10}
          blur={2}
          color={color}
        />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
