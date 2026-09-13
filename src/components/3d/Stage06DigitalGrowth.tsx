import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

export const Stage06DigitalGrowth: React.FC = () => {
  const { scrollProgress } = useScrollJourney();
  const groupRef = useRef<THREE.Group>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);

  // Generate 3D Growth Curve Nodes
  const nodeCount = 14;
  const nodes = useMemo(() => {
    const list: { pos: [number, number, number]; scale: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const t = i / (nodeCount - 1);
      const x = (t - 0.5) * 4.6;
      // Exponential growth curve y = a * e^(b*x)
      const y = Math.pow(t, 2.2) * 2.8 - 1.4;
      const z = Math.sin(t * Math.PI) * 0.7 - 0.3;
      list.push({ pos: [x, y, z], scale: 0.08 + t * 0.08 });
    }
    return list;
  }, []);

  // Active range ~ 0.45 to 0.60 (peak ~ 0.49 - 0.55)
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const start = 0.45;
    const peakStart = 0.49;
    const peakEnd = 0.55;
    const end = 0.61;

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
    groupRef.current.rotation.y = -0.3 + Math.sin(time * 0.25) * 0.1;
    groupRef.current.position.y = Math.sin(time * 0.3) * 0.08;

    // As user scrolls toward neural network, nodes rise and disperse
    const neuralTransition = Math.max(0, Math.min(1, (scrollProgress - 0.52) / 0.08));
    if (nodesGroupRef.current) {
      nodesGroupRef.current.position.y = neuralTransition * 0.6;
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
      {/* 3D Geometric Bar Pillars (Growth Trend) */}
      {[-1.8, -1.2, -0.6, 0.0, 0.6, 1.2, 1.8].map((x, i) => {
        const height = 0.4 + Math.pow((i + 1) / 7, 2) * 2.2;
        return (
          <group key={i} position={[x, -1.4 + height / 2, 0]}>
            <mesh>
              <boxGeometry args={[0.22, height, 0.22]} />
              <meshPhysicalMaterial
                color="#0284c7"
                emissive="#0369a1"
                emissiveIntensity={0.5 + i * 0.1}
                roughness={0.15}
                metalness={0.5}
                transmission={0.4}
                userData={{ baseOpacity: 0.85 }}
              />
            </mesh>
            {/* Top Glowing Cap */}
            <mesh position={[0, height / 2 + 0.01, 0]}>
              <boxGeometry args={[0.24, 0.03, 0.24]} />
              <meshBasicMaterial color="#38bdf8" userData={{ baseOpacity: 1 }} />
            </mesh>
          </group>
        );
      })}

      {/* Parabolic Glowing Trajectory Beam */}
      <group ref={nodesGroupRef}>
        {nodes.map((node, i) => (
          <mesh key={i} position={node.pos}>
            <sphereGeometry args={[node.scale, 24, 24]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={2.5}
              userData={{ baseOpacity: 0.95 }}
            />
          </mesh>
        ))}

        {/* Floating KPI Signal Rings */}
        <group position={[1.8, 1.5, 0]}>
          <mesh>
            <torusGeometry args={[0.38, 0.015, 16, 48]} />
            <meshBasicMaterial color="#38bdf8" userData={{ baseOpacity: 0.8 }} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#ffffff" userData={{ baseOpacity: 1 }} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
