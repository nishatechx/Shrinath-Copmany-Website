import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

export const Stage07NeuralNetwork: React.FC = () => {
  const { scrollProgress } = useScrollJourney();
  const groupRef = useRef<THREE.Group>(null);
  const coreNodesRef = useRef<THREE.Group>(null);

  // Generate 3D Neural Nodes & Interconnecting Synapses
  const [nodePositions, connections] = useMemo(() => {
    const count = 28;
    const pos: [number, number, number][] = [];

    // Spherical mathematical distribution (Fibonacci spiral on sphere)
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // -1 to 1
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const scale = 1.7 + ((i % 3) * 0.3);
      const x = Math.cos(theta) * radius * scale;
      const z = Math.sin(theta) * radius * scale;
      pos.push([x, y * scale, z]);
    }

    // Connect nodes that are within threshold distance
    const conns: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i][0] - pos[j][0];
        const dy = pos[i][1] - pos[j][1];
        const dz = pos[i][2] - pos[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 1.8) {
          conns.push([i, j]);
        }
      }
    }

    return [pos, conns];
  }, []);

  // Active range ~ 0.54 to 0.69 (peak ~ 0.58 - 0.65)
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const start = 0.54;
    const peakStart = 0.58;
    const peakEnd = 0.65;
    const end = 0.70;

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
    groupRef.current.rotation.y = time * 0.25;
    groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;

    // As user scrolls toward tech core, nodes contract into dense nucleus
    const convergeProgress = Math.max(0, Math.min(1, (scrollProgress - 0.62) / 0.07));
    const scaleFactor = 1 - convergeProgress * 0.45;
    if (coreNodesRef.current) {
      coreNodesRef.current.scale.setScalar(scaleFactor);
    }

    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        child.material.transparent = true;
        const base = child.material.userData.baseOpacity || 1;
        child.material.opacity = base * opacity;
      } else if (child instanceof THREE.LineSegments && child.material) {
        child.material.transparent = true;
        child.material.opacity = 0.55 * opacity;
      }
    });
  });

  // Build line segments geometry
  const lineGeometry = useMemo(() => {
    const points: number[] = [];
    connections.forEach(([i, j]) => {
      points.push(...nodePositions[i]);
      points.push(...nodePositions[j]);
    });
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geom;
  }, [nodePositions, connections]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group ref={coreNodesRef}>
        {/* Synaptic Axon Connections */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial color="#38bdf8" />
        </lineSegments>

        {/* Neural Nodes (Synapses) */}
        {nodePositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={2.5}
              userData={{ baseOpacity: 0.95 }}
            />
          </mesh>
        ))}

        {/* Central Luminous AI Matrix Core */}
        <mesh>
          <icosahedronGeometry args={[0.75, 2]} />
          <meshPhysicalMaterial
            color="#0284c7"
            emissive="#1d4ed8"
            emissiveIntensity={1.4}
            roughness={0.1}
            transmission={0.6}
            wireframe
            userData={{ baseOpacity: 0.8 }}
          />
        </mesh>
      </group>
    </group>
  );
};
