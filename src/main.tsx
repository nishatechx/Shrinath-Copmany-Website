import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './App.tsx';
import { SiteContentProvider } from './context/SiteContentContext.tsx';
import { PREMIUM_EASE } from './utils/motionVariants.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig
      reducedMotion="user"
      transition={{
        duration: 0.5,
        ease: PREMIUM_EASE,
      }}
    >
      <SiteContentProvider>
        <App />
      </SiteContentProvider>
    </MotionConfig>
  </StrictMode>,
);

