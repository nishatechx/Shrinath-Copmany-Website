import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

// Spline keyframes for the 11 narrative chapters (0 to 10)
const CAMERA_KEYFRAMES: {
  pos: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}[] = [
  // 01: Hero Identity
  { pos: [0, 0.2, 8.5], lookAt: [0, 0, 0], fov: 42 },
  // 02: Idea Sphere & Blueprint
  { pos: [0, 0, 6.5], lookAt: [0, 0, 0], fov: 40 },
  // 03: Design UI Components
  { pos: [0.8, 0.3, 5.8], lookAt: [0.1, 0, 0], fov: 42 },
  // 04: Development & Code Matrix
  { pos: [-0.9, -0.2, 5.6], lookAt: [-0.1, 0, 0], fov: 42 },
  // 05: Mobile Experience
  { pos: [0, 0.1, 5.2], lookAt: [0, 0, 0], fov: 40 },
  // 06: Digital Growth & Analytics
  { pos: [0.7, 0.6, 6.2], lookAt: [0, 0.1, 0], fov: 44 },
  // 07: AI Neural Network
  { pos: [0, 0, 5.2], lookAt: [0, 0, 0], fov: 46 },
  // 08: Technology Core
  { pos: [0, 0.2, 6.8], lookAt: [0, 0, 0], fov: 42 },
  // 09: Services Ecosystem
  { pos: [0, 0, 6.2], lookAt: [0, 0, 0], fov: 42 },
  // 10: Projects 3D Gallery
  { pos: [0, 0, 6.6], lookAt: [0, 0, 0], fov: 42 },
  // 11: Final Transformation & Convergence
  { pos: [0, 0.3, 9.6], lookAt: [0, 0.1, 0], fov: 44 },
];

export const CameraRig: React.FC = () => {
  const { scrollProgress, mouse, reducedMotion } = useScrollJourney();
  const { camera } = useThree();

  const targetPos = useRef(new THREE.Vector3(0, 0, 8.5));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // Determine fractional progress between keyframes
    const totalSegments = CAMERA_KEYFRAMES.length - 1;
    const progress = Math.max(0, Math.min(1, scrollProgress));
    const rawIndex = progress * totalSegments;
    const idx = Math.min(totalSegments - 1, Math.floor(rawIndex));
    const factor = rawIndex - idx;

    // Smooth cubic easing for transition between camera stops
    const easedFactor = factor * factor * (3 - 2 * factor);

    const kfA = CAMERA_KEYFRAMES[idx];
    const kfB = CAMERA_KEYFRAMES[idx + 1] || kfA;

    // Base interpolated position
    const posX = kfA.pos[0] + (kfB.pos[0] - kfA.pos[0]) * easedFactor;
    const posY = kfA.pos[1] + (kfB.pos[1] - kfA.pos[1]) * easedFactor;
    const posZ = kfA.pos[2] + (kfB.pos[2] - kfA.pos[2]) * easedFactor;

    // Subtle parallax from mouse and organic idle breathing
    const time = state.clock.getElapsedTime();
    const idleX = Math.sin(time * 0.4) * 0.08;
    const idleY = Math.cos(time * 0.3) * 0.06;

    const parallaxX = reducedMotion ? 0 : mouse.x * 0.45 + idleX;
    const parallaxY = reducedMotion ? 0 : mouse.y * 0.35 + idleY;

    targetPos.current.set(posX + parallaxX, posY + parallaxY, posZ);

    const lookX = kfA.lookAt[0] + (kfB.lookAt[0] - kfA.lookAt[0]) * easedFactor + (reducedMotion ? 0 : mouse.x * 0.12);
    const lookY = kfA.lookAt[1] + (kfB.lookAt[1] - kfA.lookAt[1]) * easedFactor + (reducedMotion ? 0 : mouse.y * 0.08);
    const lookZ = kfA.lookAt[2] + (kfB.lookAt[2] - kfA.lookAt[2]) * easedFactor;

    targetLook.current.set(lookX, lookY, lookZ);

    // Dynamic FOV interpolation
    const targetFov = kfA.fov + (kfB.fov - kfA.fov) * easedFactor;
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, delta * 3);
      camera.updateProjectionMatrix();
    }

    // Smooth position and lookAt interpolation (lerp)
    const lerpSpeed = delta * 3.5;
    camera.position.lerp(targetPos.current, lerpSpeed);
    currentLook.current.lerp(targetLook.current, lerpSpeed);
    camera.lookAt(currentLook.current);
  });

  return null;
};
