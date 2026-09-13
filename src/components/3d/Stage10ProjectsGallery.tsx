import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollJourney } from '../../context/ScrollJourneyContext';
import { PROJECTS } from '../../data/content';

export const Stage10ProjectsGallery: React.FC = () => {
  const { scrollProgress, activeProjectIndex } = useScrollJourney();
  const groupRef = useRef<THREE.Group>(null);
  const planesRef = useRef<THREE.Group>(null);

  // Active range ~ 0.82 to 0.94 (peak ~ 0.86 - 0.92)
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const start = 0.82;
    const peakStart = 0.86;
    const peakEnd = 0.92;
    const end = 0.96;

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

    if (planesRef.current) {
      // Smoothly slide the projects horizontally/depth-wise based on activeProjectIndex
      const targetX = -activeProjectIndex * 2.8;
      planesRef.current.position.x = THREE.MathUtils.lerp(planesRef.current.position.x, targetX, delta * 3);
      planesRef.current.position.y = Math.sin(time * 0.3) * 0.06;
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
      <group ref={planesRef}>
        {PROJECTS.slice(0, 6).map((project, idx) => {
          const isActive = idx === activeProjectIndex;
          const posX = idx * 2.8;
          const posZ = isActive ? 0.3 : -0.8;
          const rotY = isActive ? 0 : (idx < activeProjectIndex ? 0.25 : -0.25);

          return (
            <group key={project.id} position={[posX, 0, posZ]} rotation={[0, rotY, 0]}>
              {/* Project Card Slab */}
              <mesh>
                <boxGeometry args={[2.3, 1.5, 0.08]} />
                <meshPhysicalMaterial
                  color={isActive ? '#0f172a' : '#020617'}
                  emissive={isActive ? '#0284c7' : '#000000'}
                  emissiveIntensity={isActive ? 0.4 : 0}
                  roughness={0.2}
                  metalness={0.7}
                  clearcoat={1}
                  userData={{ baseOpacity: isActive ? 0.95 : 0.6 }}
                />
              </mesh>

              {/* Glowing Active Border */}
              {isActive && (
                <mesh position={[0, 0, -0.01]}>
                  <boxGeometry args={[2.36, 1.56, 0.04]} />
                  <meshBasicMaterial color="#38bdf8" wireframe userData={{ baseOpacity: 0.9 }} />
                </mesh>
              )}

              {/* Display Canvas Placeholder / Screen Plate */}
              <mesh position={[0, 0.15, 0.05]}>
                <planeGeometry args={[2.1, 1.05]} />
                <meshBasicMaterial
                  color={project.accentColor || '#3b82f6'}
                  userData={{ baseOpacity: 0.85 }}
                />
              </mesh>

              {/* Category Pill */}
              <mesh position={[-0.6, -0.5, 0.05]}>
                <boxGeometry args={[0.7, 0.14, 0.02]} />
                <meshBasicMaterial color="#38bdf8" userData={{ baseOpacity: 0.9 }} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
};
