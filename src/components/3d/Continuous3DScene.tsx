import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraRig } from './CameraRig';
import { AmbientEnvironment } from './AmbientEnvironment';
import { Stage01HeroIdentity } from './Stage01HeroIdentity';
import { Stage02IdeaBlueprint } from './Stage02IdeaBlueprint';
import { Stage03DesignInterface } from './Stage03DesignInterface';
import { Stage04CodeMatrix } from './Stage04CodeMatrix';
import { Stage05MobileDevice } from './Stage05MobileDevice';
import { Stage06DigitalGrowth } from './Stage06DigitalGrowth';
import { Stage07NeuralNetwork } from './Stage07NeuralNetwork';
import { Stage08TechnologyCore } from './Stage08TechnologyCore';
import { Stage09ServicesEcosystem } from './Stage09ServicesEcosystem';
import { Stage10ProjectsGallery } from './Stage10ProjectsGallery';
import { Stage11FinalConvergence } from './Stage11FinalConvergence';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

export const Continuous3DScene: React.FC = () => {
  const { isMobile } = useScrollJourney();

  return (
    <div
      id="continuous-3d-canvas-container"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0.2, 8.5], fov: 42 }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <Suspense fallback={null}>
          {/* Continuous Camera Journey */}
          <CameraRig />

          {/* Unified Cinematic Universe & Lighting */}
          <AmbientEnvironment />

          {/* 11 Morphing 3D Narrative Stages */}
          <Stage01HeroIdentity />
          <Stage02IdeaBlueprint />
          <Stage03DesignInterface />
          <Stage04CodeMatrix />
          <Stage05MobileDevice />
          <Stage06DigitalGrowth />
          <Stage07NeuralNetwork />
          <Stage08TechnologyCore />
          <Stage09ServicesEcosystem />
          <Stage10ProjectsGallery />
          <Stage11FinalConvergence />
        </Suspense>
      </Canvas>
    </div>
  );
};
