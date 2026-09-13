import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

export const Stage03DesignInterface: React.FC = () => {
  const { scrollProgress } = useScrollJourney();
  const groupRef = useRef<THREE.Group>(null);

  // Sub-component refs for exploding component animation
  const mainBoardRef = useRef<THREE.Mesh>(null);
  const card1Ref = useRef<THREE.Group>(null);
  const card2Ref = useRef<THREE.Group>(null);
  const navBarRef = useRef<THREE.Group>(null);
  const chartPlateRef = useRef<THREE.Group>(null);

  // Active range ~ 0.18 to 0.34 (peak ~ 0.22 - 0.28)
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const start = 0.18;
    const peakStart = 0.22;
    const peakEnd = 0.28;
    const end = 0.34;

    let opacity = 0;
    if (scrollProgress >= start && scrollProgress < peakStart) {
      opacity = (scrollProgress - start) / (peakStart - start);
    } else if (scrollProgress >= peakStart && scrollProgress <= peakEnd) {
      opacity = 1;
    } else if (scrollProgress > peakEnd && scrollProgress <= end) {
      opacity = 1 - (scrollProgress - peakEnd) / (end - peakEnd);
    }

    groupRef.current.visible = opacity > 0.01;

    // Explode components as user scrolls toward next section
    const explodeProgress = Math.max(0, Math.min(1, (scrollProgress - 0.23) / 0.1));
    const zOffset = explodeProgress * 1.2;

    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = -0.25 + Math.sin(time * 0.3) * 0.05 + explodeProgress * 0.3;
    groupRef.current.rotation.x = 0.1 + Math.cos(time * 0.25) * 0.04;

    if (card1Ref.current) {
      card1Ref.current.position.z = 0.2 + zOffset * 0.8;
      card1Ref.current.position.x = -0.7 - explodeProgress * 0.4;
    }
    if (card2Ref.current) {
      card2Ref.current.position.z = 0.25 + zOffset * 1.1;
      card2Ref.current.position.x = 0.7 + explodeProgress * 0.4;
    }
    if (navBarRef.current) {
      navBarRef.current.position.z = 0.15 + zOffset * 0.5;
      navBarRef.current.position.y = 1.0 + explodeProgress * 0.3;
    }
    if (chartPlateRef.current) {
      chartPlateRef.current.position.z = 0.3 + zOffset * 1.3;
    }

    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        child.material.transparent = true;
        const base = child.material.userData.baseOpacity || 1;
        child.material.opacity = base * opacity;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Main Background Product Frame / Ultra-Glass Slab */}
      <mesh ref={mainBoardRef}>
        <boxGeometry args={[3.4, 2.3, 0.06]} />
        <meshPhysicalMaterial
          color="#0f172a"
          roughness={0.15}
          metalness={0.1}
          transmission={0.7}
          thickness={0.8}
          ior={1.4}
          clearcoat={1}
          userData={{ baseOpacity: 0.8 }}
        />
      </mesh>

      {/* Frame Subtle Cyan Outer Glow Border */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[3.44, 2.34, 0.04]} />
        <meshBasicMaterial color="#0284c7" wireframe userData={{ baseOpacity: 0.6 }} />
      </mesh>

      {/* 2. Top Navigation Bar Layer */}
      <group ref={navBarRef} position={[0, 0.85, 0.05]}>
        <mesh>
          <boxGeometry args={[3.1, 0.28, 0.04]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.2}
            metalness={0.5}
            userData={{ baseOpacity: 0.9 }}
          />
        </mesh>
        {/* Navigation Dot Indicators */}
        {[-1.3, -1.15, -1.0].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.03]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshBasicMaterial
              color={i === 0 ? '#ef4444' : i === 1 ? '#eab308' : '#22c55e'}
              userData={{ baseOpacity: 0.9 }}
            />
          </mesh>
        ))}
        {/* Nav Pill Badge */}
        <mesh position={[0.9, 0, 0.03]}>
          <boxGeometry args={[0.55, 0.12, 0.02]} />
          <meshBasicMaterial color="#38bdf8" userData={{ baseOpacity: 0.9 }} />
        </mesh>
      </group>

      {/* 3. Left Feature Card (Floating Glass) */}
      <group ref={card1Ref} position={[-0.75, -0.15, 0.1]}>
        <mesh>
          <boxGeometry args={[1.3, 1.3, 0.05]} />
          <meshPhysicalMaterial
            color="#1e3a8a"
            emissive="#172554"
            emissiveIntensity={0.4}
            roughness={0.2}
            transmission={0.5}
            userData={{ baseOpacity: 0.85 }}
          />
        </mesh>
        {/* Text/UI Placeholder bars */}
        <mesh position={[0, 0.35, 0.04]}>
          <boxGeometry args={[0.95, 0.12, 0.01]} />
          <meshBasicMaterial color="#60a5fa" userData={{ baseOpacity: 0.9 }} />
        </mesh>
        <mesh position={[-0.15, 0.12, 0.04]}>
          <boxGeometry args={[0.65, 0.08, 0.01]} />
          <meshBasicMaterial color="#94a3b8" userData={{ baseOpacity: 0.7 }} />
        </mesh>
        <mesh position={[0, -0.25, 0.04]}>
          <boxGeometry args={[0.95, 0.45, 0.02]} />
          <meshBasicMaterial color="#0f172a" userData={{ baseOpacity: 0.8 }} />
        </mesh>
      </group>

      {/* 4. Right Interactive Chart & Metrics Plate */}
      <group ref={card2Ref} position={[0.75, -0.15, 0.12]}>
        <mesh>
          <boxGeometry args={[1.3, 1.3, 0.05]} />
          <meshPhysicalMaterial
            color="#0f172a"
            roughness={0.2}
            transmission={0.6}
            userData={{ baseOpacity: 0.85 }}
          />
        </mesh>

        {/* Floating Mini 3D Bars */}
        {[-0.35, -0.12, 0.12, 0.35].map((x, i) => {
          const height = 0.3 + i * 0.18;
          return (
            <mesh key={i} position={[x, -0.4 + height / 2, 0.05]}>
              <boxGeometry args={[0.12, height, 0.04]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#0284c7"
                emissiveIntensity={0.8}
                userData={{ baseOpacity: 0.9 }}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};
