import { useEffect, useMemo, useRef, useState } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import confetti from "canvas-confetti";

const init = async (engine: Engine) => {
  await loadSlim(engine);
};

export function PetalsBackground() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Periodic gold confetti bursts from the top corners
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;
    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });
    const colors = ["#FFD700", "#F4D35E", "#B8860B", "#FFF3B0", "#E94560", "#8B0000"];

    const fire = () => {
      const side = Math.random() > 0.5 ? "left" : "right";
      myConfetti({
        particleCount: 24,
        angle: side === "left" ? 300 : 240,
        spread: 55,
        startVelocity: 35,
        gravity: 0.65,
        scalar: 0.9,
        ticks: 260,
        origin: { x: side === "left" ? 0 : 1, y: 0 },
        colors,
        shapes: ["square", "circle"],
        drift: side === "left" ? 1 : -1,
      });
    };

    const t = setTimeout(fire, 800);
    const id = setInterval(fire, 4200);
    return () => {
      clearTimeout(t);
      clearInterval(id);
      myConfetti.reset();
    };
  }, [mounted]);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 50, density: { enable: true, area: 900 } },
        shape: {
          type: "character" as const,
          options: {
            character: [
              { value: "✦", font: "Verdana", weight: "400", style: "" },
              { value: "✧", font: "Verdana", weight: "400", style: "" },
              { value: "✺", font: "Verdana", weight: "400", style: "" },
              { value: "❋", font: "Verdana", weight: "400", style: "" },
            ],
          },
        },
        color: { value: ["#FFD700", "#F4D35E", "#FFF3B0", "#E9C46A", "#FFB347"] },
        opacity: {
          value: { min: 0.3, max: 1 },
          animation: { enable: true, speed: 2, sync: false, startValue: "random" as const },
        },
        size: { value: { min: 6, max: 16 } },
        rotate: {
          value: { min: 0, max: 360 },
          direction: "random" as const,
          animation: { enable: true, speed: 12 },
        },
        move: {
          enable: true,
          direction: "bottom" as const,
          speed: { min: 0.4, max: 1.4 },
          straight: false,
          drift: { min: -0.6, max: 0.6 },
          outModes: { default: "out" as const },
        },
        wobble: { enable: true, distance: 18, speed: 8 },
        twinkle: {
          particles: { enable: true, frequency: 0.06, opacity: 1, color: { value: "#FFF3B0" } },
        },
      },
    }),
    []
  );

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[11] h-full w-full"
        aria-hidden
      />
      <ParticlesProvider init={init}>
        <div className="pointer-events-none fixed inset-0 z-10">
          <Particles id="sparkles" options={options} className="h-full w-full" />
        </div>
      </ParticlesProvider>
    </>
  );
}
