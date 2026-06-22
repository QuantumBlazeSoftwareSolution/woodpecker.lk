"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function WoodArtMesh({ cameraZ }: { cameraZ: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Load the beautiful generated high-res wood art texture
  const woodTexture = useTexture("/textures/wood_art_hero.png");

  // Subtle breathing rotation to keep the scene organic and alive
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.04;
      meshRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.15) * 0.025;
    }
  });

  return (
    <group>
      {/* Dynamic Gallery Shadow Backdrop */}
      <mesh position={[0, 0, -1.8]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#F5F2EB" roughness={0.95} />
      </mesh>

      {/* Main Bespoke Wood Wall Art Sculpture with photorealistic texture mapping */}
      <mesh ref={meshRef} position={[0, 0, -0.5]}>
        <boxGeometry args={[4.2, 3.2, 0.1]} />
        <meshStandardMaterial
          map={woodTexture}
          roughness={0.35}
          metalness={0.05}
          bumpScale={0.05}
        />
      </mesh>
    </group>
  );
}
