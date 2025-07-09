"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./GlowingDotsBackground.module.css";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  colorIndex: number;
  lastUpdate: number;
}

const GlowingDotsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastFrameTime = useRef(0);
  const [isClient, setIsClient] = useState(false);
  const [animateRef] = useAutoAnimate({
    duration: 300,
    easing: "ease-in-out",
  });

  // Optimized color palette - pre-computed values
  const colors = useMemo(
    () => [
      { r: 59, g: 130, b: 246 }, // Blue
      { r: 147, g: 51, b: 234 }, // Purple
      { r: 236, g: 72, b: 153 }, // Pink
      { r: 34, g: 197, b: 94 }, // Green
    ],
    [],
  );

  // Reduced particle count based on device capabilities
  const getParticleCount = useCallback(() => {
    if (typeof window === "undefined") return 20;
    const isMobile = window.innerWidth < 768;
    const isLowPerformance = navigator.hardwareConcurrency < 4;

    if (isMobile || isLowPerformance) return 15;
    return 25;
  }, []);

  // Initialize particles only once
  const initializeParticles = useCallback(() => {
    if (typeof window === "undefined") return [];

    const count = getParticleCount();
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: 0.5,
        baseOpacity: Math.random() * 0.3 + 0.3,
        colorIndex: Math.floor(Math.random() * colors.length),
        lastUpdate: 0,
      });
    }

    return particles;
  }, [colors.length, getParticleCount]);

  // Throttled mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Initialize on client
  useEffect(() => {
    setIsClient(true);
    particlesRef.current = initializeParticles();
  }, [initializeParticles]);

  // Mouse event listener
  useEffect(() => {
    if (!isClient) return;

    let throttleTimer: NodeJS.Timeout;
    const throttledMouseMove = (e: MouseEvent) => {
      if (throttleTimer) return;
      throttleTimer = setTimeout(() => {
        handleMouseMove(e);
        throttleTimer = null as any;
      }, 16);
    };

    window.addEventListener("mousemove", throttledMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [isClient, handleMouseMove]);

  // Optimized animation loop
  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation loop with frame limiting
    const animate = (currentTime: number) => {
      // Limit to 30fps for better performance
      if (currentTime - lastFrameTime.current < 33) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime.current = currentTime;

      // Clear canvas
      ctx.fillStyle = "rgba(15, 15, 35, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const time = currentTime * 0.001;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const color = colors[particle.colorIndex];

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary bounce
        if (particle.x <= 0 || particle.x >= window.innerWidth) {
          particle.vx *= -0.8;
          particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
        }
        if (particle.y <= 0 || particle.y >= window.innerHeight) {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
        }

        // Simple mouse interaction
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          const force = ((80 - distance) / 80) * 0.02;
          particle.x -= dx * force;
          particle.y -= dy * force;
        }

        // Update opacity with simple sine wave
        particle.opacity = particle.baseOpacity + Math.sin(time + i) * 0.2;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw connections (reduced checks)
        if (i % 2 === 0) {
          for (let j = i + 1; j < particles.length; j += 2) {
            const other = particles[j];
            const dx2 = particle.x - other.x;
            const dy2 = particle.y - other.y;
            const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);

            if (dist < 100) {
              ctx.save();
              ctx.globalAlpha = ((100 - dist) / 100) * 0.1;
              ctx.strokeStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isClient, colors]);

  // Simplified static dots with AutoAnimate
  const staticDots = useMemo(() => {
    if (!isClient) return [];

    const count = getParticleCount() / 2;
    return Array.from({ length: count }, (_, i) => {
      const color = colors[i % colors.length];
      return (
        <div
          key={i}
          className={styles.staticDot}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random()}px`,
            height: `${1 + Math.random()}px`,
            backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      );
    });
  }, [isClient, colors, getParticleCount]);

  if (!isClient) {
    return <div className={styles.backgroundContainer} />;
  }

  return (
    <div className={styles.backgroundContainer}>
      {/* Simplified gradient overlays */}
      <div className={styles.gradientOverlay} />

      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className={styles.particleCanvas}
        style={{ pointerEvents: "none" }}
      />

      {/* AutoAnimate container for static dots */}
      <div ref={animateRef} className={styles.staticDotsContainer}>
        {staticDots}
      </div>

      {/* Floating shape with CSS animation */}
      <div className={styles.floatingShape} />
    </div>
  );
};

export default GlowingDotsBackground;
