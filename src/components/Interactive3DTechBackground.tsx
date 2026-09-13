import React, { useEffect, useRef } from 'react';

export type Tech3DVariant = 'matrix-grid' | 'neural-constellation' | 'cyber-circuit' | 'quantum-flow';

interface Interactive3DTechBackgroundProps {
  className?: string;
  variant?: Tech3DVariant;
  theme?: 'dark' | 'light';
  density?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  intensity?: number; // 0.1 to 1.0
  speed?: number; // speed multiplier, default 1
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  alpha: number;
  color?: string;
}

interface Packet3D {
  from: number;
  to: number;
  progress: number;
  speed: number;
}

interface Polyhedron3D {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vRotX: number;
  vRotY: number;
  vRotZ: number;
  size: number;
  type: 'cube' | 'octahedron';
}

export const Interactive3DTechBackground: React.FC<Interactive3DTechBackgroundProps> = ({
  className = '',
  variant = 'matrix-grid',
  theme = 'dark',
  density = 'medium',
  interactive = true,
  intensity = 0.85,
  speed = 1,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current || canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Dimensions setup with devicePixelRatio for sharp retina display
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const updateSize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    // Pause rendering when off-screen for battery and CPU optimization
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Camera & Mouse 3D perspective
    const camera = {
      rotX: 0,
      rotY: 0,
      targetRotX: 0,
      targetRotY: 0,
      fov: 480,
    };

    const mouse = {
      x: -9999,
      y: -9999,
      normalizedX: 0,
      normalizedY: 0,
      isHovered: false,
      rippleX: 0,
      rippleY: 0,
      rippleRadius: 0,
      rippleMax: 240,
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;

      if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
        mouse.x = mouseX;
        mouse.y = mouseY;
        mouse.normalizedX = (mouseX / rect.width) * 2 - 1;
        mouse.normalizedY = (mouseY / rect.height) * 2 - 1;
        mouse.isHovered = true;

        camera.targetRotY = mouse.normalizedX * 0.35;
        camera.targetRotX = -mouse.normalizedY * 0.25;
      } else {
        mouse.isHovered = false;
        camera.targetRotX = 0;
        camera.targetRotY = 0;
      }
    };

    const handlePointerLeave = () => {
      mouse.isHovered = false;
      mouse.x = -9999;
      mouse.y = -9999;
      camera.targetRotX = 0;
      camera.targetRotY = 0;
    };

    const handleClick = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouse.rippleX = e.clientX - rect.left;
      mouse.rippleY = e.clientY - rect.top;
      mouse.rippleRadius = 1;
    };

    if (interactive) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
      window.addEventListener('touchmove', handlePointerMove, { passive: true });
      container.addEventListener('click', handleClick);
      container.addEventListener('mouseleave', handlePointerLeave);
    }

    // Determine counts based on density and dimensions
    const area = Math.max(width * height, 300000);
    let nodeCount = 38;
    if (density === 'low') nodeCount = Math.floor(area / 38000);
    else if (density === 'high') nodeCount = Math.floor(area / 16000);
    else nodeCount = Math.floor(area / 24000);
    nodeCount = Math.max(22, Math.min(nodeCount, 75));

    // Color palettes
    const isLight = theme === 'light';
    const primaryColor = isLight ? 'rgba(37, 99, 235,' : 'rgba(56, 189, 248,'; // Blue-600 / Sky-400
    const secondaryColor = isLight ? 'rgba(2, 132, 199,' : 'rgba(129, 140, 248,'; // Sky-600 / Indigo-400
    const accentCyan = isLight ? 'rgba(14, 165, 233,' : 'rgba(34, 211, 238,'; // Cyan
    const gridLineColor = isLight ? 'rgba(37, 99, 235, 0.07)' : 'rgba(56, 189, 248, 0.08)';

    // Initialize 3D Points
    const points: Point3D[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const px = (Math.random() - 0.5) * (width * 1.25);
      const py = (Math.random() - 0.5) * (height * 1.25);
      const pz = (Math.random() - 0.5) * 450;
      points.push({
        x: px,
        y: py,
        z: pz,
        baseX: px,
        baseY: py,
        baseZ: pz,
        vx: (Math.random() - 0.5) * 0.45 * speed,
        vy: (Math.random() - 0.5) * 0.45 * speed,
        vz: (Math.random() - 0.5) * 0.35 * speed,
        radius: Math.random() * 2.5 + 1.2,
        alpha: Math.random() * 0.5 + 0.35,
        color: Math.random() > 0.4 ? primaryColor : secondaryColor,
      });
    }

    // Traveling data packets
    const packets: Packet3D[] = [];
    for (let i = 0; i < Math.min(8, Math.floor(nodeCount / 4)); i++) {
      packets.push({
        from: Math.floor(Math.random() * nodeCount),
        to: Math.floor(Math.random() * nodeCount),
        progress: Math.random(),
        speed: (Math.random() * 0.008 + 0.006) * speed,
      });
    }

    // Floating 3D Geometric Polyhedra (Cubes / Octahedrons)
    const polyhedra: Polyhedron3D[] = [];
    const polyCount = variant === 'cyber-circuit' || variant === 'matrix-grid' ? 4 : 2;
    for (let i = 0; i < polyCount; i++) {
      polyhedra.push({
        x: (Math.random() - 0.5) * (width * 0.9),
        y: (Math.random() - 0.5) * (height * 0.8),
        z: (Math.random() - 0.5) * 200 + 40,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        vRotX: (Math.random() - 0.5) * 0.012 * speed,
        vRotY: (Math.random() - 0.5) * 0.015 * speed,
        vRotZ: (Math.random() - 0.5) * 0.01 * speed,
        size: Math.random() * 22 + 18,
        type: i % 2 === 0 ? 'cube' : 'octahedron',
      });
    }

    // 3D rotation & projection math helper
    const project = (x: number, y: number, z: number, cRotX: number, cRotY: number) => {
      // Rotate around Y
      const cosY = Math.cos(cRotY);
      const sinY = Math.sin(cRotY);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      // Rotate around X
      const cosX = Math.cos(cRotX);
      const sinX = Math.sin(cRotX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const perspective = camera.fov / (camera.fov + z2 + 300);
      return {
        screenX: width / 2 + x1 * perspective,
        screenY: height / 2 + y2 * perspective,
        scale: perspective,
        depth: z2,
      };
    };

    // Draw a 3D rotating wireframe cube
    const draw3DCube = (poly: Polyhedron3D, cRotX: number, cRotY: number) => {
      const s = poly.size;
      const vertices = [
        [-s, -s, -s],
        [s, -s, -s],
        [s, s, -s],
        [-s, s, -s],
        [-s, -s, s],
        [s, -s, s],
        [s, s, s],
        [-s, s, s],
      ];

      // Local rotation matrix
      const rotVertices = vertices.map(([vx, vy, vz]) => {
        // Rot X
        let y1 = vy * Math.cos(poly.rotX) - vz * Math.sin(poly.rotX);
        let z1 = vy * Math.sin(poly.rotX) + vz * Math.cos(poly.rotX);
        // Rot Y
        let x2 = vx * Math.cos(poly.rotY) + z1 * Math.sin(poly.rotY);
        let z2 = -vx * Math.sin(poly.rotY) + z1 * Math.cos(poly.rotY);
        // Rot Z
        let x3 = x2 * Math.cos(poly.rotZ) - y1 * Math.sin(poly.rotZ);
        let y3 = x2 * Math.sin(poly.rotZ) + y1 * Math.cos(poly.rotZ);

        return project(poly.x + x3, poly.y + y3, poly.z + z2, cRotX, cRotY);
      });

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];

      ctx.strokeStyle = isLight
        ? `rgba(37, 99, 235, ${0.14 * intensity})`
        : `rgba(56, 189, 248, ${0.22 * intensity})`;
      ctx.lineWidth = 1;

      for (const [v1, v2] of edges) {
        const p1 = rotVertices[v1];
        const p2 = rotVertices[v2];
        if (p1.scale > 0 && p2.scale > 0) {
          ctx.beginPath();
          ctx.moveTo(p1.screenX, p1.screenY);
          ctx.lineTo(p2.screenX, p2.screenY);
          ctx.stroke();
        }
      }
    };

    // Draw 3D undulating terrain grid (for matrix-grid variant)
    const draw3DUndulatingGrid = (time: number, cRotX: number, cRotY: number) => {
      const gridRows = 9;
      const gridCols = 16;
      const stepX = (width * 1.3) / gridCols;
      const stepZ = 500 / gridRows;
      const groundY = height * 0.38;

      ctx.lineWidth = 0.8;
      ctx.strokeStyle = gridLineColor;

      const gridPoints: { screenX: number; screenY: number; scale: number }[][] = [];

      for (let r = 0; r <= gridRows; r++) {
        gridPoints[r] = [];
        const gz = -150 + r * stepZ;
        for (let c = 0; c <= gridCols; c++) {
          const gx = -width * 0.65 + c * stepX;
          // Wave height formula
          const waveY =
            groundY +
            Math.sin(c * 0.45 + time * 1.2) * 16 +
            Math.cos(r * 0.55 + time) * 14;

          const proj = project(gx, waveY, gz, cRotX, cRotY);
          gridPoints[r][c] = proj;
        }
      }

      // Draw horizontal grid lines
      for (let r = 0; r <= gridRows; r++) {
        ctx.beginPath();
        let started = false;
        for (let c = 0; c <= gridCols; c++) {
          const p = gridPoints[r][c];
          if (p.scale > 0) {
            if (!started) {
              ctx.moveTo(p.screenX, p.screenY);
              started = true;
            } else {
              ctx.lineTo(p.screenX, p.screenY);
            }
          }
        }
        ctx.stroke();
      }

      // Draw depth grid lines
      for (let c = 0; c <= gridCols; c += 2) {
        ctx.beginPath();
        let started = false;
        for (let r = 0; r <= gridRows; r++) {
          const p = gridPoints[r][c];
          if (p.scale > 0) {
            if (!started) {
              ctx.moveTo(p.screenX, p.screenY);
              started = true;
            } else {
              ctx.lineTo(p.screenX, p.screenY);
            }
          }
        }
        ctx.stroke();
      }
    };

    let time = 0;

    // Main 60FPS Render Loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.015 * speed;

      // Smooth camera interpolation (ease-out inertia)
      camera.rotX += (camera.targetRotX - camera.rotX) * 0.06;
      camera.rotY += (camera.targetRotY - camera.rotY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw 3D Undulating Ground Grid if matrix-grid or cyber-circuit
      if (variant === 'matrix-grid' || variant === 'cyber-circuit') {
        draw3DUndulatingGrid(time, camera.rotX, camera.rotY);
      }

      // 2. Draw Interactive Ripple expansion
      if (mouse.rippleRadius > 0) {
        mouse.rippleRadius += 4 * speed;
        const rippleAlpha = Math.max(0, (1 - mouse.rippleRadius / mouse.rippleMax) * 0.35);
        ctx.beginPath();
        ctx.arc(mouse.rippleX, mouse.rippleY, mouse.rippleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `${accentCyan}${rippleAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (mouse.rippleRadius >= mouse.rippleMax) {
          mouse.rippleRadius = 0;
        }
      }

      // 3. Update & Project Points
      const projectedPoints = points.map((p, idx) => {
        // Natural 3D orbital drift
        p.x += p.vx + Math.sin(time + idx * 0.2) * 0.25;
        p.y += p.vy + Math.cos(time + idx * 0.2) * 0.25;
        p.z += p.vz + Math.sin(time * 0.8 + idx * 0.3) * 0.2;

        // Wrap around 3D boundaries
        const boundX = width * 0.7;
        const boundY = height * 0.7;
        const boundZ = 240;
        if (p.x < -boundX) p.x = boundX;
        if (p.x > boundX) p.x = -boundX;
        if (p.y < -boundY) p.y = boundY;
        if (p.y > boundY) p.y = -boundY;
        if (p.z < -boundZ) p.z = boundZ;
        if (p.z > boundZ) p.z = -boundZ;

        // Project point into 2D screen coordinates with current 3D camera
        const proj = project(p.x, p.y, p.z, camera.rotX, camera.rotY);

        // Interactive mouse attraction/repulsion in screen space
        if (mouse.isHovered) {
          const dx = mouse.x - proj.screenX;
          const dy = mouse.y - proj.screenY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 130;
          if (dist < maxDist && dist > 0) {
            const force = (maxDist - dist) / maxDist;
            p.x -= (dx / dist) * force * 1.8;
            p.y -= (dy / dist) * force * 1.8;
          }
        }

        return {
          ...proj,
          point: p,
          idx,
        };
      });

      // 4. Draw 3D Interconnecting Lines (Constellation & Circuit vectors)
      const maxConnDist = variant === 'quantum-flow' ? 100 : 135;
      for (let i = 0; i < projectedPoints.length; i++) {
        const p1 = projectedPoints[i];
        if (p1.scale <= 0) continue;

        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p2 = projectedPoints[j];
          if (p2.scale <= 0) continue;

          // Euclidean distance in 3D
          const dx = p1.point.x - p2.point.x;
          const dy = p1.point.y - p2.point.y;
          const dz = p1.point.z - p2.point.z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < maxConnDist) {
            const lineAlpha =
              (1 - dist3D / maxConnDist) *
              (isLight ? 0.16 : 0.28) *
              intensity *
              ((p1.scale + p2.scale) / 2);

            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);
            ctx.strokeStyle = `${primaryColor}${lineAlpha})`;
            ctx.lineWidth = Math.max(0.4, (p1.scale + p2.scale) * 0.6);
            ctx.stroke();
          }
        }
      }

      // 5. Draw Traveling Data Packets along connections
      for (let k = 0; k < packets.length; k++) {
        const packet = packets[k];
        packet.progress += packet.speed;
        if (packet.progress >= 1) {
          packet.progress = 0;
          packet.from = Math.floor(Math.random() * points.length);
          packet.to = Math.floor(Math.random() * points.length);
        }

        const pFrom = projectedPoints[packet.from];
        const pTo = projectedPoints[packet.to];

        if (pFrom && pTo && pFrom.scale > 0 && pTo.scale > 0) {
          const curX = pFrom.screenX + (pTo.screenX - pFrom.screenX) * packet.progress;
          const curY = pFrom.screenY + (pTo.screenY - pFrom.screenY) * packet.progress;
          const packetScale = (pFrom.scale + pTo.scale) / 2;

          ctx.beginPath();
          ctx.arc(curX, curY, 2 * packetScale, 0, Math.PI * 2);
          ctx.fillStyle = isLight
            ? `rgba(2, 132, 199, ${0.85 * intensity})`
            : `rgba(34, 211, 238, ${0.9 * intensity})`;
          ctx.fill();

          // Packet glow
          ctx.beginPath();
          ctx.arc(curX, curY, 4.5 * packetScale, 0, Math.PI * 2);
          ctx.fillStyle = isLight
            ? `rgba(2, 132, 199, ${0.25 * intensity})`
            : `rgba(56, 189, 248, ${0.35 * intensity})`;
          ctx.fill();
        }
      }

      // 6. Draw 3D Floating Polyhedra
      for (const poly of polyhedra) {
        poly.rotX += poly.vRotX;
        poly.rotY += poly.vRotY;
        poly.rotZ += poly.vRotZ;
        draw3DCube(poly, camera.rotX, camera.rotY);
      }

      // 7. Draw 3D Glowing Nodes with depth perspective
      for (const p of projectedPoints) {
        if (p.scale <= 0) continue;

        const r = p.point.radius * p.scale;
        const alpha = p.point.alpha * p.scale * intensity;

        // Outer glow
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `${p.point.color || primaryColor}${alpha * 0.28})`;
        ctx.fill();

        // Inner glowing core
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, Math.max(1, r), 0, Math.PI * 2);
        ctx.fillStyle = `${p.point.color || primaryColor}${alpha})`;
        ctx.fill();

        // Sparkle pinpoint for closer nodes
        if (p.scale > 1.05) {
          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, r * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = isLight ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.95)';
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (interactive) {
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('touchmove', handlePointerMove);
        if (container) {
          container.removeEventListener('click', handleClick);
          container.removeEventListener('mouseleave', handlePointerLeave);
        }
      }
    };
  }, [variant, theme, density, interactive, intensity, speed]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
