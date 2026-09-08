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

}

export default function FlowField() {

  const canvasRef =
    useRef<HTMLCanvasElement>(
      null
    );

  useEffect(() => {

    const canvas =
      canvasRef.current;

    if (!canvas)
      return;

    const context =
      canvas.getContext("2d");

    if (!context)
      return;

    let animationFrame = 0;

    let width = 0;

    let height = 0;

    let particles: Particle[] = [];

    const resize = () => {

      width =
        window.innerWidth;

      height =
        window.innerHeight;

      canvas.width =
        width;

      canvas.height =
        height;

      particles =
        Array.from(
          {
            length: 350,
          },

          () => ({
            x:
              Math.random() *
              width,

            y:
              Math.random() *
              height,

            speed:
              0.3 +
              Math.random() *
                0.8,

            life:
              Math.random() *
              100,
          })
        );

    };

    const animate = () => {

      context.fillStyle =
        "rgba(5,8,10,0.08)";

      context.fillRect(
        0,
        0,
        width,
        height
      );

      particles.forEach(
        (
          particle
        ) => {

          const angle =
            Math.sin(
              particle.x *
                0.003
            ) +
            Math.cos(
              particle.y *
                0.003
            );

          particle.x +=
            Math.cos(angle) *
            particle.speed;

          particle.y +=
            Math.sin(angle) *
            particle.speed;

          if (
            particle.x < 0 ||
            particle.x > width ||
            particle.y < 0 ||
            particle.y > height
          ) {

            particle.x =
              Math.random() *
              width;

            particle.y =
              Math.random() *
              height;

          }

          context.beginPath();

          context.arc(
            particle.x,
            particle.y,
            1,
            0,
            Math.PI * 2
          );

          context.fillStyle =
            "rgba(0,217,255,0.55)";

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

      ref={
        canvasRef
      }

      className="
        pointer-events-none
        fixed
        inset-0
        -z-10
        h-full
        w-full
      "

    />

  );
}
