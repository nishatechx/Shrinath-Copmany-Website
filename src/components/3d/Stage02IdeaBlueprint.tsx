import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

export const Stage02IdeaBlueprint: React.FC = () => {
  const { scrollProgress } = useScrollJourney();
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const wireSphereRef = useRef<THREE.Mesh>(null);
  const blueprintRingsRef = useRef<THREE.Group>(null);

  // Active roughly from progress 0.08 to 0.24 (peak ~ 0.14 - 0.18)
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const start = 0.08;
    const peakStart = 0.13;
    const peakEnd = 0.19;
    const end = 0.25;

    let opacity = 0;
    if (scrollProgress >= start && scrollProgress < peakStart) {
      opacity = (scrollProgress - start) / (peakStart - start);
    } else if (scrollProgress >= peakStart && scrollProgress <= peakEnd) {
      opacity = 1;
    } else if (scrollProgress > peakEnd && scrollProgress <= end) {
      opacity = 1 - (scrollProgress - peakEnd) / (end - peakEnd);
    }

    groupRef.current.visible = opacity > 0.01;

    // As user scrolls, sphere expands & fine blueprint lines emerge
    const expansionProgress = Math.max(0, Math.min(1, (scrollProgress - 0.08) / 0.14));
    const sphereScale = 0.8 + expansionProgress * 0.9;
    const wireOpacity = Math.min(1, expansionProgress * 1.5);

    const time = state.clock.getElapsedTime();

    if (sphereRef.current) {
      sphereRef.current.scale.setScalar(sphereScale);
      sphereRef.current.rotation.y = time * 0.3;
      sphereRef.current.rotation.x = Math.sin(time * 0.2) * 0.15;
    }

    if (wireSphereRef.current) {
      wireSphereRef.current.scale.setScalar(sphereScale * 1.08);
      wireSphereRef.current.rotation.y = -time * 0.2;
      wireSphereRef.current.rotation.z = time * 0.15;
    }

    if (blueprintRingsRef.current) {
      blueprintRingsRef.current.rotation.x = time * 0.2;
      blueprintRingsRef.current.rotation.y = time * 0.4;
      blueprintRingsRef.current.scale.setScalar(1 + expansionProgress * 0.7);
    }

    // Apply opacities
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        child.material.transparent = true;
        const base = child.material.userData.baseOpacity || 1;
        child.material.opacity = base * opacity * (child.material.userData.wire ? wireOpacity : 1);
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. The Core Luminous Idea Sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.2, 48, 48]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={1.2}
          roughness={0.15}
          metalness={0.2}
          transmission={0.6}
          thickness={1.5}
          ior={1.5}
          userData={{ baseOpacity: 0.85 }}
        />
      </mesh>

      {/* 2. Inner Idea Energy Pulse */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          userData={{ baseOpacity: 0.9 }}
        />
      </mesh>

      {/* 3. Wireframe Digital Blueprint Sphere */}
      <mesh ref={wireSphereRef}>
        <sphereGeometry args={[1.22, 24, 24]} />
        <meshBasicMaterial
          color="#60a5fa"
          wireframe
          userData={{ baseOpacity: 0.7, wire: true }}
        />
      </mesh>

      {/* 4. Fine Blueprint Technical Coordinate Rings & Latitudes */}
      <group ref={blueprintRingsRef}>
        <mesh>
          <torusGeometry args={[1.65, 0.015, 16, 96]} />
          <meshBasicMaterial color="#38bdf8" userData={{ baseOpacity: 0.85, wire: true }} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.75, 0.012, 16, 96]} />
          <meshBasicMaterial color="#0ea5e9" userData={{ baseOpacity: 0.75, wire: true }} />
        </mesh>
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[1.85, 0.01, 16, 96]} />
          <meshBasicMaterial color="#93c5fd" userData={{ baseOpacity: 0.65, wire: true }} />
        </mesh>

        {/* Orthogonal Blueprint Dimension Tick Marks */}
        {[-1.6, -0.8, 0, 0.8, 1.6].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.02, 0.25, 0.02]} />
            <meshBasicMaterial color="#38bdf8" userData={{ baseOpacity: 0.8, wire: true }} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
