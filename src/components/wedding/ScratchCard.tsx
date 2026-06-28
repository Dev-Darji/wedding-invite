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

    const parent = canvas.parentElement;
    if (!parent) return;

    const drawFoil = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const scale = width / 180; // proportional scaling factor for portrait

      // 1. Create a rich royal maroon/crimson gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#4a0a14");   // Deep Velvet Maroon
      grad.addColorStop(0.5, "#7e1e2d"); // Classic Royal Crimson
      grad.addColorStop(1, "#36050c");   // Dark Maroon Shadow

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw gold double borders
      ctx.strokeStyle = "rgba(229, 193, 88, 0.75)";
      ctx.lineWidth = Math.max(1, 1.5 * scale);
      const padding = 8 * scale;
      ctx.strokeRect(padding, padding, width - padding * 2, height - padding * 2);

      ctx.strokeStyle = "rgba(229, 193, 88, 0.4)";
      ctx.lineWidth = Math.max(0.5, 0.8 * scale);
      const innerPadding = padding + 4 * scale;
      ctx.strokeRect(innerPadding, innerPadding, width - innerPadding * 2, height - innerPadding * 2);

      // 3. Draw a beautiful golden mandala in the center
      const cx = width / 2;
      const cy = height / 2 - 15 * scale;
      const r = 24 * scale;

      ctx.strokeStyle = "rgba(229, 193, 88, 0.55)";
      ctx.lineWidth = Math.max(0.75, 1.2 * scale);
      
      // Outer circle
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // Inner circle
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.5, 0, Math.PI * 2);
      ctx.stroke();

      // Mandali rays/petals
      const rays = 12;
      for (let a = 0; a < Math.PI * 2; a += (Math.PI * 2) / rays) {
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * (r * 0.25), cy + Math.sin(a) * (r * 0.25));
        ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        ctx.stroke();
      }

      // Outer dots
      ctx.fillStyle = "rgba(229, 193, 88, 0.6)";
      for (let a = 0; a < Math.PI * 2; a += (Math.PI * 2) / 8) {
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * (r * 1.25), cy + Math.sin(a) * (r * 1.25), 1.5 * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Draw Center Elegant Gold Text
      ctx.fillStyle = "#e5c158"; // Bright Gold
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      ctx.font = `${Math.max(10, Math.round(11 * scale))}px 'Cinzel', serif, Georgia`;
      ctx.fillText("SCRATCH ME", width / 2, height / 2 + 25 * scale);

      ctx.font = `${Math.max(7, Math.round(8 * scale))}px 'Poppins', sans-serif`;
      ctx.fillStyle = "rgba(229, 193, 88, 0.85)";
      ctx.fillText("REVEAL DATE", width / 2, height / 2 + 40 * scale);
    };

    const resizeObserver = new ResizeObserver(() => {
      if (isRevealedRef.current) return;
      const rect = parent.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width > 0 && height > 0) {
        canvas.width = width;
        canvas.height = height;
        drawFoil(ctx, width, height);
      }
    });

    // Run once initially to size immediately
    const rect = parent.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      canvas.width = rect.width;
      canvas.height = rect.height;
      drawFoil(ctx, rect.width, rect.height);
    } else {
      // fallback default sizes if bounding rect is 0 initially
      canvas.width = 180;
      canvas.height = 240;
      drawFoil(ctx, 180, 240);
    }

    resizeObserver.observe(parent);

    return () => {
      resizeObserver.disconnect();
    };
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

    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) {
        transparentPixels++;
      }
    }

    const totalSampledPixels = data.length / 16;
    const percentage = transparentPixels / totalSampledPixels;

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
        particleCount: 65,
        spread: 75,
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
    const brushRadius = Math.max(12, Math.round(canvas.width * 0.14));

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
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl p-4 text-center select-none border border-[#c4a46a]/30 bg-gradient-to-br from-[#faf8f4] to-[#f5f0e3] shadow-md hover:shadow-lg transition-all duration-300">
      {/* Corner ornaments for wedding invite look */}
      <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-[#c4a46a]/50" />
      <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-[#c4a46a]/50" />
      <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-[#c4a46a]/50" />
      <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-[#c4a46a]/50" />

      {/* Background/Revealed Content */}
      <div className="flex h-full flex-col items-center justify-center py-2">
        <div className="text-[#c4a46a] text-sm font-serif mb-1 opacity-80">✦ 🌸 ✦</div>
        <div className="text-[#7e1e2d] font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none my-2 break-words uppercase">
          {content}
        </div>
        <div className="mx-auto w-8 h-[1px] bg-gradient-to-r from-transparent via-[#c4a46a]/40 to-transparent my-1" />
        <div className="mt-1 font-display text-[9px] sm:text-xs tracking-[0.2em] text-[#c4a46a] font-bold uppercase">
          {label}
        </div>
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
            className="absolute inset-0 z-10 touch-none cursor-crosshair w-full h-full"
          />
        )}
      </AnimatePresence>


      {/* Manual reveal backup for accessibility */}
      {!isRevealed && (
        <button
          onClick={revealCard}
          className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/40 hover:bg-black/60 px-3 py-1.5 text-[8px] font-display tracking-widest text-[#e5c158] transition-colors border border-[#e5c158]/35 cursor-pointer"
        >
          TAP
        </button>
      )}
    </div>
  );
}
