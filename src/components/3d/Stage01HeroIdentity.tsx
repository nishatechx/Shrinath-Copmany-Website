import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

export const Stage01HeroIdentity: React.FC = () => {
  const { scrollProgress, mouse } = useScrollJourney();
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  // Active range: 0.0 to 0.15
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth visibility window: visible from 0 to 0.14, fading out toward 0.16
    const t = scrollProgress / 0.14;
    let opacity = 1;
    let scale = 1;
    let posY = 0;

    if (t > 1) {
      const exitFactor = Math.min(1, (scrollProgress - 0.14) / 0.06);
      opacity = 1 - exitFactor;
      scale = 1 + exitFactor * 0.4;
      posY = exitFactor * 1.5;
    }

    groupRef.current.position.y = posY;
    groupRef.current.scale.setScalar(scale);

    // Organic idle rotation + mouse tilt
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.2 + mouse.y * 0.2;
      coreRef.current.rotation.y = time * 0.35 + mouse.x * 0.3;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.4;
      ring1Ref.current.rotation.y = time * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.35;
      ring2Ref.current.rotation.z = time * 0.25;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.3;
      ring3Ref.current.rotation.x = -time * 0.2;
    }

    // Traverse and apply dynamic opacity
    groupRef.current.visible = opacity > 0.01;
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            mat.transparent = true;
            mat.opacity = (mat.userData.baseOpacity || 1) * opacity;
          });
        } else {
          child.material.transparent = true;
          child.material.opacity = (child.material.userData.baseOpacity || 1) * opacity;
        }
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Faceted Monolith / Diamond Crystal */}
      <mesh ref={coreRef} castShadow receiveShadow>
        <octahedronGeometry args={[1.3, 2]} />
        <meshPhysicalMaterial
          color="#1e3a8a"
          emissive="#1d4ed8"
          emissiveIntensity={0.65}
          roughness={0.12}
          metalness={0.88}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.4}
          ior={1.6}
          userData={{ baseOpacity: 0.95 }}
        />
      </mesh>

      {/* Internal Luminous Energy Nucleus */}
      <mesh>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={2.5}
          roughness={0.1}
          userData={{ baseOpacity: 0.9 }}
        />
      </mesh>

      {/* Concentric Precision Laser Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.0, 0.022, 16, 100]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1.8}
          userData={{ baseOpacity: 0.85 }}
        />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.4, 0.018, 16, 100]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={1.4}
          userData={{ baseOpacity: 0.75 }}
        />
      </mesh>

      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.8, 0.014, 16, 100]} />
        <meshStandardMaterial
          color="#93c5fd"
          emissive="#60a5fa"
          emissiveIntensity={1.2}
          userData={{ baseOpacity: 0.65 }}
        />
      </mesh>

      {/* Floating Micro Interface Nodes / HUD points */}
      {[
        [1.8, 1.2, 0.5],
        [-1.7, 1.4, -0.6],
        [1.5, -1.5, 0.8],
        [-1.9, -1.1, -0.4],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={3}
              userData={{ baseOpacity: 0.9 }}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[0.09, 0.11, 32]} />
            <meshBasicMaterial
              color="#60a5fa"
              side={THREE.DoubleSide}
              userData={{ baseOpacity: 0.7 }}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
