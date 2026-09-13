import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

export const Stage09ServicesEcosystem: React.FC = () => {
  const { scrollProgress, activeServiceIndex } = useScrollJourney();
  const groupRef = useRef<THREE.Group>(null);
  const transformerRef = useRef<THREE.Group>(null);

  // Active range ~ 0.72 to 0.87 (peak ~ 0.77 - 0.83)
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const start = 0.72;
    const peakStart = 0.77;
    const peakEnd = 0.83;
    const end = 0.88;

    let opacity = 0;
    if (scrollProgress >= start && scrollProgress < peakStart) {
      opacity = (scrollProgress - start) / (peakStart - start);
    } else if (scrollProgress >= peakStart && scrollProgress <= peakEnd) {
      opacity = 1;
    } else if (scrollProgress > peakEnd && scrollProgress <= end) {
      opacity = 1 - (scrollProgress - peakEnd) / (end - peakEnd);
    }

    groupRef.current.visible = opacity > 0.01;

    const time = state.clock.getElapsedTime();

    if (transformerRef.current) {
      transformerRef.current.rotation.y = time * 0.4 + activeServiceIndex * 0.8;
      transformerRef.current.rotation.x = Math.sin(time * 0.3) * 0.15;
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
      <group ref={transformerRef}>
        {/* Dynamic central faceted morphing crystal */}
        <mesh>
          <octahedronGeometry args={[1.2, 1]} />
          <meshPhysicalMaterial
            color={
              activeServiceIndex === 0 ? '#0284c7' :
              activeServiceIndex === 1 ? '#2563eb' :
              activeServiceIndex === 2 ? '#3b82f6' :
              activeServiceIndex === 3 ? '#0ea5e9' :
              activeServiceIndex === 4 ? '#8b5cf6' :
              activeServiceIndex === 5 ? '#38bdf8' :
              '#06b6d4'
            }
            emissive={
              activeServiceIndex === 0 ? '#0369a1' :
              activeServiceIndex === 1 ? '#1d4ed8' :
              activeServiceIndex === 2 ? '#2563eb' :
              activeServiceIndex === 3 ? '#0284c7' :
              activeServiceIndex === 4 ? '#6d28d9' :
              activeServiceIndex === 5 ? '#0284c7' :
              '#0891b2'
            }
            emissiveIntensity={1.5}
            roughness={0.15}
            metalness={0.8}
            transmission={0.4}
            wireframe={activeServiceIndex % 2 === 1}
            userData={{ baseOpacity: 0.9 }}
          />
        </mesh>

        {/* Orbiting Satellite Prisms */}
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const angle = (idx / 6) * Math.PI * 2;
          const r = 2.1;
          return (
            <mesh
              key={idx}
              position={[Math.cos(angle) * r, Math.sin(angle * 2) * 0.35, Math.sin(angle) * r]}
            >
              <tetrahedronGeometry args={[0.22, 0]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#38bdf8"
                emissiveIntensity={2}
                userData={{ baseOpacity: 0.85 }}
              />
            </mesh>
          );
        })}

        {/* Radial Connection Vectors */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.0, 2.03, 64]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} userData={{ baseOpacity: 0.7 }} />
        </mesh>
      </group>
    </group>
  );
};
