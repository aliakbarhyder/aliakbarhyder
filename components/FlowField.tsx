"use client";

import {
  useEffect,
  useRef,
} from "react";

interface Particle {
  x: number;
  y: number;
  speed: number;
  life: number;
  maxLife: number;
}

export default function FlowField() {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const context =
      canvas.getContext("2d");

    if (!context) return;

    let animationFrame = 0;

    let width = 0;
    let height = 0;

    const particles: Particle[] = [];

    const createParticle =
      (): Particle => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speed:
          0.3 + Math.random() * 1.2,
        life: 0,
        maxLife:
          150 + Math.random() * 300,
      });

    const resize = () => {
      width =
        canvas.clientWidth;

      height =
        canvas.clientHeight;

      const ratio =
        window.devicePixelRatio || 1;

      canvas.width =
        width * ratio;

      canvas.height =
        height * ratio;

      context.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
      );

      particles.length = 0;

      for (
        let index = 0;
        index < 350;
        index++
      ) {
        particles.push(
          createParticle()
        );
      }
    };

    const animate = () => {
      context.fillStyle =
        "rgba(2, 6, 4, 0.08)";

      context.fillRect(
        0,
        0,
        width,
        height
      );

      particles.forEach(
        (particle, index) => {
          const angle =
            Math.sin(
              particle.x * 0.004
            ) *
              Math.PI +
            Math.cos(
              particle.y * 0.003
            ) *
              Math.PI;

          particle.x +=
            Math.cos(angle) *
            particle.speed;

          particle.y +=
            Math.sin(angle) *
            particle.speed;

          particle.life++;

          if (
            particle.life >
              particle.maxLife ||
            particle.x < 0 ||
            particle.x > width ||
            particle.y < 0 ||
            particle.y > height
          ) {
            particles[index] =
              createParticle();

            return;
          }

          const progress =
            particle.life /
            particle.maxLife;

          const alpha =
            Math.sin(
              progress * Math.PI
            ) * 0.45;

          context.beginPath();

          context.arc(
            particle.x,
            particle.y,
            1.2,
            0,
            Math.PI * 2
          );

          context.fillStyle =
            `rgba(0,255,102,${alpha})`;

          context.fill();
        }
      );

      animationFrame =
        requestAnimationFrame(
          animate
        );
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    animate();

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
