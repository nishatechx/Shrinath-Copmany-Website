import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

export const Stage11FinalConvergence: React.FC = () => {
  const { scrollProgress } = useScrollJourney();
  const groupRef = useRef<THREE.Group>(null);
  const monolithRef = useRef<THREE.Mesh>(null);
  const elementsOrbitRef = useRef<THREE.Group>(null);
  const outerRaysRef = useRef<THREE.Group>(null);

  // Active range ~ 0.88 to 1.0 (peaks 0.94 - 1.0)
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const start = 0.88;
    const peakStart = 0.93;

    let opacity = 0;
    if (scrollProgress >= start && scrollProgress < peakStart) {
      opacity = (scrollProgress - start) / (peakStart - start);
    } else if (scrollProgress >= peakStart) {
      opacity = 1;
    }

    groupRef.current.visible = opacity > 0.01;

    // Convergence progress: elements contract inward into the center as user approaches 1.0
    const convergence = Math.max(0, Math.min(1, (scrollProgress - 0.89) / 0.09));
    const orbitRadius = THREE.MathUtils.lerp(3.2, 0.4, convergence);
    const monolithScale = THREE.MathUtils.lerp(0.2, 1.4, convergence);

    const time = state.clock.getElapsedTime();

    if (elementsOrbitRef.current) {
      elementsOrbitRef.current.rotation.y = time * 0.5;
      elementsOrbitRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
      elementsOrbitRef.current.scale.setScalar(orbitRadius / 3.2);
    }

    if (monolithRef.current) {
      monolithRef.current.scale.setScalar(monolithScale);
      monolithRef.current.rotation.y = time * 0.4;
      monolithRef.current.rotation.x = time * 0.2;
    }

    if (outerRaysRef.current) {
      outerRaysRef.current.rotation.z = -time * 0.2;
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
      {/* Central Majestic Shrinath IT Monolith Form */}
      <mesh ref={monolithRef}>
        <octahedronGeometry args={[1.5, 2]} />
        <meshPhysicalMaterial
          color="#1e3a8a"
          emissive="#2563eb"
          emissiveIntensity={2.5}
          roughness={0.1}
          metalness={0.9}
          transmission={0.4}
          clearcoat={1}
          userData={{ baseOpacity: 0.98 }}
        />
      </mesh>

      {/* Radiant Inner Core */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial color="#ffffff" userData={{ baseOpacity: 1 }} />
      </mesh>

      {/* Converging Thematic Artifacts (Spiraling in) */}
      <group ref={elementsOrbitRef}>
        {/* 1. Idea Sphere artifact */}
        <mesh position={[2.8, 0.5, 0]}>
          <sphereGeometry args={[0.25, 24, 24]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={2}
            userData={{ baseOpacity: 0.9 }}
          />
        </mesh>

        {/* 2. UI Glass Fragment */}
        <mesh position={[-2.6, 0.8, 0.5]}>
          <boxGeometry args={[0.45, 0.3, 0.04]} />
          <meshStandardMaterial color="#60a5fa" userData={{ baseOpacity: 0.85 }} />
        </mesh>

        {/* 3. Code Syntax Fragment */}
        <mesh position={[1.8, -1.8, -0.6]}>
          <boxGeometry args={[0.4, 0.08, 0.04]} />
          <meshBasicMaterial color="#34d399" userData={{ baseOpacity: 0.9 }} />
        </mesh>

        {/* 4. Smartphone silhouette */}
        <mesh position={[-1.7, -1.9, 0.7]}>
          <boxGeometry args={[0.22, 0.44, 0.03]} />
          <meshStandardMaterial color="#0284c7" userData={{ baseOpacity: 0.85 }} />
        </mesh>

        {/* 5. AI Neural Node */}
        <mesh position={[0, 2.5, -0.8]}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={2}
            userData={{ baseOpacity: 0.9 }}
          />
        </mesh>

        {/* 6. Technology Ring */}
        <mesh position={[0, -2.5, 0.8]}>
          <torusGeometry args={[0.35, 0.02, 16, 32]} />
          <meshBasicMaterial color="#38bdf8" userData={{ baseOpacity: 0.85 }} />
        </mesh>
      </group>

      {/* Outer Convergence Laser Rings */}
      <group ref={outerRaysRef}>
        <mesh>
          <torusGeometry args={[3.2, 0.015, 16, 120]} />
          <meshBasicMaterial color="#38bdf8" userData={{ baseOpacity: 0.7 }} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.6, 0.012, 16, 120]} />
          <meshBasicMaterial color="#60a5fa" userData={{ baseOpacity: 0.6 }} />
        </mesh>
      </group>
    </group>
  );
};
