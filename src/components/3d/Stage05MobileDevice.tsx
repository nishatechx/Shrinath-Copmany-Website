import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

export const Stage05MobileDevice: React.FC = () => {
  const { scrollProgress, mouse } = useScrollJourney();
  const groupRef = useRef<THREE.Group>(null);
  const phoneRef = useRef<THREE.Group>(null);
  const tabletRef = useRef<THREE.Group>(null);
  const dataLine1Ref = useRef<THREE.Line>(null);
  const dataLine2Ref = useRef<THREE.Line>(null);

  // Active range ~ 0.36 to 0.51 (peak ~ 0.40 - 0.46)
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const start = 0.36;
    const peakStart = 0.40;
    const peakEnd = 0.46;
    const end = 0.52;

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

    if (phoneRef.current) {
      // Natural 3D phone rotation + subtle tilt
      phoneRef.current.rotation.y = Math.sin(time * 0.4) * 0.35 + mouse.x * 0.3;
      phoneRef.current.rotation.x = 0.15 + Math.cos(time * 0.3) * 0.1 - mouse.y * 0.2;
    }

    if (tabletRef.current) {
      tabletRef.current.position.y = 0.4 + Math.sin(time * 0.3 + 1) * 0.08;
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
      {/* 1. Primary 3D Smartphone */}
      <group ref={phoneRef} position={[0, 0, 0.4]}>
        {/* Phone Outer Chassis / Aluminum Frame */}
        <mesh castShadow>
          <boxGeometry args={[1.5, 3.0, 0.14]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.9}
            roughness={0.15}
            userData={{ baseOpacity: 0.95 }}
          />
        </mesh>

        {/* Screen Display Face */}
        <mesh position={[0, 0, 0.075]}>
          <planeGeometry args={[1.38, 2.86]} />
          <meshPhysicalMaterial
            color="#0284c7"
            emissive="#0369a1"
            emissiveIntensity={0.5}
            roughness={0.08}
            metalness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.05}
            userData={{ baseOpacity: 0.95 }}
          />
        </mesh>

        {/* Dynamic Island / Camera Notch */}
        <mesh position={[0, 1.25, 0.08]}>
          <boxGeometry args={[0.35, 0.08, 0.01]} />
          <meshBasicMaterial color="#020617" userData={{ baseOpacity: 1 }} />
        </mesh>

        {/* Floating Screen UI Preview Elements */}
        <group position={[0, 0, 0.082]}>
          {/* Header Hero Pill */}
          <mesh position={[0, 0.85, 0]}>
            <boxGeometry args={[1.15, 0.4, 0.01]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.8}
              userData={{ baseOpacity: 0.9 }}
            />
          </mesh>
          {/* Feed Cards */}
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[1.15, 0.5, 0.01]} />
            <meshStandardMaterial color="#1e293b" userData={{ baseOpacity: 0.85 }} />
          </mesh>
          <mesh position={[0, -0.4, 0]}>
            <boxGeometry args={[1.15, 0.5, 0.01]} />
            <meshStandardMaterial color="#1e293b" userData={{ baseOpacity: 0.85 }} />
          </mesh>
          {/* Bottom Home Indicator Bar */}
          <mesh position={[0, -1.25, 0]}>
            <boxGeometry args={[0.5, 0.03, 0.01]} />
            <meshBasicMaterial color="#ffffff" userData={{ baseOpacity: 0.8 }} />
          </mesh>
        </group>
      </group>

      {/* 2. Secondary Tablet Silhouette (Receded in Background) */}
      <group ref={tabletRef} position={[2.0, 0.3, -1.4]} rotation={[0, -0.45, 0]}>
        <mesh>
          <boxGeometry args={[2.5, 3.4, 0.1]} />
          <meshPhysicalMaterial
            color="#0f172a"
            roughness={0.2}
            metalness={0.8}
            transmission={0.4}
            userData={{ baseOpacity: 0.6 }}
          />
        </mesh>
        <mesh position={[0, 0, 0.055]}>
          <planeGeometry args={[2.35, 3.2]} />
          <meshBasicMaterial color="#0369a1" wireframe userData={{ baseOpacity: 0.4 }} />
        </mesh>
      </group>

      {/* 3. Connecting Cyan Data Stream Rays between Devices */}
      <mesh position={[1.0, 0.2, -0.4]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.012, 0.012, 2.2, 16]} />
        <meshBasicMaterial color="#38bdf8" userData={{ baseOpacity: 0.7 }} />
      </mesh>
      <mesh position={[1.0, -0.4, -0.4]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.01, 0.01, 2.1, 16]} />
        <meshBasicMaterial color="#60a5fa" userData={{ baseOpacity: 0.6 }} />
      </mesh>
    </group>
  );
};
