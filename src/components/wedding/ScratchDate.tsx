import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "@/lib/wedding-config";
import { SectionTitle } from "./SectionTitle";
import { ScratchCard } from "./ScratchCard";
import confetti from "canvas-confetti";

function calcTimeRemaining(targetTime: number) {
  const diff = Math.max(0, targetTime - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

export function ScratchDate() {
  const weddingDate = new Date(wedding.date);
  
  // Format the date elements
  const dateStr = String(weddingDate.getDate()).padStart(2, "0");
  const monthStr = weddingDate.toLocaleString("default", { month: "short" }).toUpperCase();
  const yearStr = String(weddingDate.getFullYear());

  const cards = [
    { label: "Date", value: dateStr },
    { label: "Month", value: monthStr },
    { label: "Year", value: yearStr },
  ];

  // State to track scratched status of each card
  const [scratched, setScratched] = useState<Record<string, boolean>>({
    Date: false,
    Month: false,
    Year: false,
  });

  const handleScratchComplete = (label: string) => {
    setScratched((prev) => {
      const next = { ...prev, [label]: true };
      
      // If all three cards are scratched, automatically trigger the blessings!
      if (next.Date && next.Month && next.Year) {
        setTimeout(() => {
          handleShowerBlessings();
        }, 500);
      }
      
      return next;
    });
  };

  const allScratched = scratched.Date && scratched.Month && scratched.Year;

  // Countdown timer logic
  const targetTime = new Date(wedding.date).getTime();
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    if (allScratched) {
      setTimeLeft(calcTimeRemaining(targetTime));
      const intervalId = setInterval(() => {
        setTimeLeft(calcTimeRemaining(targetTime));
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [allScratched, targetTime]);

  const handleShowerBlessings = () => {
    const colors = ["#b8860b", "#f4d35e", "#fff3b0", "#f43f5e", "#10b981"];
    // Left side spray
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors
    });
    // Right side spray
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors
    });
    // Center spray
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors
    });
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="pointer-events-none absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-rose-500/5 blur-[100px]" aria-hidden />
      <div className="pointer-events-none absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-amber-500/5 blur-[100px]" aria-hidden />

      <SectionTitle eyebrow="Save the Date" title="Scratch to Reveal" />

      <p className="mx-auto mt-4 max-w-md px-6 text-center text-sm tracking-wide text-[#5c1c28] font-medium sm:text-base">
        Scratch the golden foil on each card to reveal the sacred date of our union.
      </p>

      {/* Cards container: aspect-[3/4] portrait cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mx-auto mt-12 grid grid-cols-3 gap-3 sm:gap-6 px-4 sm:px-6 max-w-2xl"
      >
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="w-full flex justify-center"
          >
            <ScratchCard 
              content={c.value} 
              label={c.label} 
              onScratchComplete={() => handleScratchComplete(c.label)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Automatic countdown counter appearing below the scratchcards */}
      <AnimatePresence>
        {allScratched && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 30 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-14 w-full max-w-4xl mx-auto px-6 text-center overflow-hidden"
          >
            {/* Title for Countdown */}
            <motion.h4
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-display text-xs sm:text-sm tracking-[0.3em] text-[#7e1e2d] font-bold uppercase mb-8"
            >
              ⚜ The Countdown Begins ⚜
            </motion.h4>

            {/* Countdown Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 max-w-3xl mx-auto">
              {[
                { label: "Days", value: timeLeft.d },
                { label: "Hours", value: timeLeft.h },
                { label: "Minutes", value: timeLeft.m },
                { label: "Seconds", value: timeLeft.s },
              ].map((unit, idx) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                  className="relative overflow-hidden rounded-2xl border border-[#c4a46a]/30 bg-gradient-to-br from-[#faf7f0] to-[#f3ebd9] px-4 py-6 text-center shadow-md"
                >
                  <div className="text-gold-static font-display text-3xl font-bold sm:text-5xl">
                    {String(unit.value).padStart(2, "0")}
                  </div>
                  <div className="mt-2 font-display text-[10px] tracking-[0.2em] text-[#7e1e2d] font-bold sm:text-xs">
                    {unit.label.toUpperCase()}
                  </div>
                  <div className="pointer-events-none absolute inset-x-4 bottom-2 h-px bg-gradient-to-r from-transparent via-[#c4a46a]/40 to-transparent" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shower Blessings Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-12 flex justify-center"
      >
        <button
          onClick={handleShowerBlessings}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7e1e2d] via-amber-600 to-[#7e1e2d] bg-[length:200%_auto] font-display text-sm tracking-[0.2em] text-white font-bold transition-all duration-300 hover:bg-[position:right_center] hover:scale-105 shadow-[0_10px_30px_-10px_rgba(126,30,45,0.5)] flex items-center gap-2 cursor-pointer"
        >
          <span>SHOWER BLESSINGS</span>
          <span className="text-white animate-pulse">❤</span>
        </button>
      </motion.div>
    </section>
  );
}
