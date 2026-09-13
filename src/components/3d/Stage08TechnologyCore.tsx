import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

const TECH_LABELS = [
  'React',
  'Node.js',
  'Python',
  'Flutter',
  'PHP',
  'WordPress',
  'AI',
  'JavaScript',
  'HTML',
  'CSS',
];

// Helper to create sharp canvas textures for 3D badges
function createBadgeTexture(text: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 80;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Transparent background with subtle high-tech gradient pill
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(4, 4, 248, 72, 36);
    ctx.fill();

    // High-tech glowing cyan border
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Crisp typography
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 30px monospace, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 41);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const Stage08TechnologyCore: React.FC = () => {
  const { scrollProgress } = useScrollJourney();
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);

  // Generate badges with textures
  const badges = useMemo(() => {
    return TECH_LABELS.map((label, idx) => {
      const angle = (idx / TECH_LABELS.length) * Math.PI * 2;
      const radius = 2.4;
      const y = Math.sin(idx * 1.5) * 0.45;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const texture = createBadgeTexture(label);
      return { label, pos: [x, y, z] as [number, number, number], texture };
    });
  }, []);

  // Active range ~ 0.63 to 0.78 (peak ~ 0.68 - 0.74)
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const start = 0.63;
    const peakStart = 0.68;
    const peakEnd = 0.74;
    const end = 0.79;

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

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.35;
      ring1Ref.current.rotation.y = time * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.3;
      ring2Ref.current.rotation.z = time * 0.25;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.28;
      ring3Ref.current.rotation.x = -time * 0.18;
    }

    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y = time * 0.25;
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
      {/* Central Quantum Energy Reactor Core */}
      <mesh>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshPhysicalMaterial
          color="#1e40af"
          emissive="#2563eb"
          emissiveIntensity={1.8}
          roughness={0.12}
          metalness={0.9}
          transmission={0.4}
          userData={{ baseOpacity: 0.95 }}
        />
      </mesh>

      {/* Internal Luminous Plasma Sphere */}
      <mesh>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={3}
          userData={{ baseOpacity: 1 }}
        />
      </mesh>

      {/* Gyroscopic Concentric Tech Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.5, 0.024, 16, 96]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1.8}
          userData={{ baseOpacity: 0.85 }}
        />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.8, 0.02, 16, 96]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={1.5}
          userData={{ baseOpacity: 0.8 }}
        />
      </mesh>

      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.1, 0.016, 16, 96]} />
        <meshStandardMaterial
          color="#93c5fd"
          emissive="#60a5fa"
          emissiveIntensity={1.2}
          userData={{ baseOpacity: 0.7 }}
        />
      </mesh>

      {/* Orbiting 3D Technology Badges */}
      <group ref={orbitGroupRef}>
        {badges.map((badge, i) => (
          <group key={i} position={badge.pos}>
            <mesh>
              <planeGeometry args={[0.95, 0.32]} />
              <meshBasicMaterial
                map={badge.texture}
                transparent
                side={THREE.DoubleSide}
                userData={{ baseOpacity: 0.95 }}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
