import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface ScratchCardProps {
  content: string;
  label: string;
  onScratchComplete?: () => void;
}

export function ScratchCard({ content, label, onScratchComplete }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const isRevealedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (isRevealedRef.current) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      const width = rect?.width || 200;
      const height = rect?.height || 200;
      canvas.width = width;
      canvas.height = height;

      drawFoil(ctx, width, height);
    };

    const drawFoil = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const scale = width / 240; // proportional scaling factor

      // 1. Create a beautiful deep gold gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#c59f3d");   // Deep Bronze Gold
      grad.addColorStop(0.2, "#dfba5f"); // Classic Gold
      grad.addColorStop(0.5, "#f6e09a"); // Warm golden shimmer (no white spots)
      grad.addColorStop(0.8, "#dfba5f"); // Classic Gold
      grad.addColorStop(1, "#c59f3d");   // Deep Bronze Gold

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw an ornate border inside the card
      ctx.strokeStyle = "rgba(107, 84, 36, 0.55)";
      ctx.lineWidth = Math.max(1.5, 2 * scale);
      
      const padding = 10 * scale;
      ctx.strokeRect(padding, padding, width - padding * 2, height - padding * 2);
      ctx.strokeRect(padding + 4 * scale, padding + 4 * scale, width - (padding + 4 * scale) * 2, height - (padding + 4 * scale) * 2);

      // 3. Draw diagonal shiny lines
      ctx.strokeStyle = "rgba(255, 243, 176, 0.2)";
      ctx.lineWidth = Math.max(2, 4 * scale);
      for (let i = -height; i < width; i += 25 * scale) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + height, height);
        ctx.stroke();
      }

      // 4. Draw Center Elegant Emblem/Text (Proportionally scaled)
      ctx.fillStyle = "#5c4008"; // Deep gold brown for contrast
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      ctx.font = `${Math.max(14, Math.round(24 * scale))}px serif`;
      ctx.fillText("✨", width / 2, height / 2 - 20 * scale);

      ctx.font = `${Math.max(9, Math.round(13 * scale))}px 'Cinzel', serif, Georgia`;
      ctx.fillText("SCRATCH ME", width / 2, height / 2 + 5 * scale);

      ctx.font = `${Math.max(6, Math.round(8 * scale))}px 'Poppins', sans-serif`;
      ctx.fillStyle = "rgba(92, 64, 8, 0.85)";
      ctx.fillText("REVEAL DATE", width / 2, height / 2 + 22 * scale);
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealedRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    let transparentPixels = 0;

    // Sample every 4th pixel's alpha value to optimize performance
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) {
        transparentPixels++;
      }
    }

    const totalSampledPixels = data.length / 16;
    const percentage = transparentPixels / totalSampledPixels;

    // Reveal at 35% scratched for a smooth and responsive experience
    if (percentage > 0.35) {
      revealCard();
    }
  };

  const revealCard = () => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    setIsRevealed(true);
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { x, y },
        colors: ["#b8860b", "#f4d35e", "#fff3b0", "#f43f5e"],
      });
    }

    if (onScratchComplete) {
      onScratchComplete();
    }
  };

  const getCoordinates = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const draw = (e: any) => {
    if (!isDrawing || isRevealedRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { x, y } = getCoordinates(e);
    
    // Scale the brush size dynamically with card width to prevent instant-reveal on mobile
    const brushRadius = Math.max(10, Math.round(canvas.width * 0.12));

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const handleStart = (e: any) => {
    if (isRevealedRef.current) return;
    setIsDrawing(true);
    draw(e);
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  return (
    <div className="glass-card relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center select-none shadow-[var(--shadow-royal)] bg-black/25">
      {/* Background/Revealed Content */}
      <div className="flex h-full flex-col items-center justify-center">
        <div className="text-gold-static font-display text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight break-words uppercase">
          {content}
        </div>
        <div className="mt-1 sm:mt-3 font-sans text-[10px] sm:text-xs tracking-[0.2em] text-amber-300 font-bold">
          {label.toUpperCase()}
        </div>
        <div className="pointer-events-none absolute inset-x-3 sm:inset-x-6 bottom-2 sm:bottom-4 h-px bg-gradient-to-r from-transparent via-[oklch(0.78_0.15_82)] to-transparent" />
      </div>

      {/* Foreground/Scratchable Canvas */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.canvas
            ref={canvasRef}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onMouseDown={handleStart}
            onMouseMove={draw}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={draw}
            onTouchEnd={handleEnd}
            className="absolute inset-0 z-10 touch-none cursor-crosshair"
          />
        )}
      </AnimatePresence>

      {/* Manual reveal backup for accessibility */}
      {!isRevealed && (
        <button
          onClick={revealCard}
          className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 rounded bg-black/45 px-2 py-0.5 text-[8px] tracking-wider text-[oklch(0.88_0.09_86)] hover:bg-black/60 transition-colors"
        >
          TAP
        </button>
      )}
    </div>
  );
}
