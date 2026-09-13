import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

export const AmbientEnvironment: React.FC = () => {
  const { isMobile, scrollProgress } = useScrollJourney();
  const pointsRef = useRef<THREE.Points>(null);
  const gridRef = useRef<THREE.GridHelper>(null);

  // Generate fine floating digital cyber particles
  const particleCount = isMobile ? 350 : 900;
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sc = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 26;
      sc[i] = Math.random() * 0.8 + 0.3;
    }
    return [pos, sc];
  }, [particleCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Slow ambient drift + scroll velocity acceleration
      const time = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = time * 0.02 + scrollProgress * 0.5;
      pointsRef.current.rotation.x = Math.sin(time * 0.015) * 0.05;
    }

    if (gridRef.current) {
      // Subtle horizon perspective shift
      gridRef.current.position.y = -3.8;
      gridRef.current.position.z = (scrollProgress * 4) % 2;
    }
  });

  return (
    <>
      {/* Exponential Fog for deep cinematic infinite perspective */}
      <color attach="background" args={['#030712']} />
      <fogExp2 attach="fog" args={['#030712', 0.055]} />

      {/* Cinematic Lighting System */}
      <ambientLight intensity={0.45} color="#cbd5e1" />
      
      {/* Primary Key Light (Pure White-Platinum) */}
      <directionalLight
        position={[6, 8, 7]}
        intensity={1.2}
        color="#f8fafc"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Cool Azure / Cyan Rim Light */}
      <directionalLight
        position={[-6, -4, -4]}
        intensity={1.6}
        color="#0284c7"
      />

      {/* Dynamic Royal Blue Core Light */}
      <pointLight
        position={[0, 0, 1.5]}
        intensity={2.2}
        distance={12}
        decay={2}
        color="#38bdf8"
      />

      {/* Subtle Indigo Accent Fill */}
      <pointLight
        position={[-3, 2, -2]}
        intensity={1.1}
        distance={10}
        decay={2}
        color="#6366f1"
      />

      {/* Ambient Digital Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.045 : 0.055}
          color="#38bdf8"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Subtle Bottom Cyber Grid Horizon */}
      <gridHelper
        ref={gridRef}
        args={[40, 40, '#0284c7', '#0f172a']}
        position={[0, -3.8, 0]}
      />
    </>
  );
};
