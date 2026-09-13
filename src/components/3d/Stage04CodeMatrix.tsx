import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

export const Stage04CodeMatrix: React.FC = () => {
  const { scrollProgress, isMobile } = useScrollJourney();
  const groupRef = useRef<THREE.Group>(null);
  const codeLinesRef = useRef<THREE.Group>(null);

  // Generate abstract code token blocks (representing syntax indentation)
  const tokenCount = isMobile ? 36 : 72;
  const tokens = useMemo(() => {
    const list: {
      pos: [number, number, number];
      size: [number, number, number];
      color: string;
    }[] = [];

    const colors = ['#38bdf8', '#818cf8', '#34d399', '#f472b6', '#94a3b8', '#60a5fa'];

    for (let i = 0; i < tokenCount; i++) {
      const line = (i % 18) - 9;
      const indent = ((i * 3) % 4) * 0.35 - 1.4;
      const x = indent + Math.random() * 0.4;
      const y = -line * 0.2;
      const z = (Math.random() - 0.5) * 0.8;
      const width = 0.2 + Math.random() * 0.45;
      const color = colors[Math.floor(Math.random() * colors.length)];

      list.push({
        pos: [x, y, z],
        size: [width, 0.065, 0.04],
        color,
      });
    }
    return list;
  }, [tokenCount]);

  // Active range ~ 0.26 to 0.42 (peak ~ 0.31 - 0.37)
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const start = 0.26;
    const peakStart = 0.31;
    const peakEnd = 0.37;
    const end = 0.43;

    let opacity = 0;
    if (scrollProgress >= start && scrollProgress < peakStart) {
      opacity = (scrollProgress - start) / (peakStart - start);
    } else if (scrollProgress >= peakStart && scrollProgress <= peakEnd) {
      opacity = 1;
    } else if (scrollProgress > peakEnd && scrollProgress <= end) {
      opacity = 1 - (scrollProgress - peakEnd) / (end - peakEnd);
    }

    groupRef.current.visible = opacity > 0.01;

    // As user scrolls, code converges into unified planar frame before morphing into phone
    const assembleProgress = Math.max(0, Math.min(1, (scrollProgress - 0.32) / 0.09));
    const time = state.clock.getElapsedTime();

    if (codeLinesRef.current) {
      codeLinesRef.current.rotation.y = time * 0.15 + assembleProgress * 0.8;
      codeLinesRef.current.position.z = (1 - assembleProgress) * 0.5;
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
      {/* 3D Code Editor Bracket Frame */}
      <mesh position={[-1.7, 0, 0]}>
        <boxGeometry args={[0.04, 3.6, 0.04]} />
        <meshBasicMaterial color="#0284c7" userData={{ baseOpacity: 0.7 }} />
      </mesh>
      <mesh position={[1.7, 0, 0]}>
        <boxGeometry args={[0.04, 3.6, 0.04]} />
        <meshBasicMaterial color="#0284c7" userData={{ baseOpacity: 0.7 }} />
      </mesh>

      {/* Abstract Syntax Tokens */}
      <group ref={codeLinesRef}>
        {tokens.map((token, idx) => (
          <mesh key={idx} position={token.pos}>
            <boxGeometry args={token.size} />
            <meshStandardMaterial
              color={token.color}
              emissive={token.color}
              emissiveIntensity={0.6}
              roughness={0.2}
              userData={{ baseOpacity: 0.88 }}
            />
          </mesh>
        ))}

        {/* Central Algorithmic Compiling Core */}
        <mesh position={[0.8, 0, 0]}>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.5}
            wireframe
            userData={{ baseOpacity: 0.9 }}
          />
        </mesh>
      </group>
    </group>
  );
};
