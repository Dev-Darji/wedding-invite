import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding-config";
import { SectionTitle } from "./SectionTitle";
import { ScratchCard } from "./ScratchCard";
import confetti from "canvas-confetti";

export function ScratchDate() {
  const weddingDate = new Date(wedding.date);
  
  // Format the date elements
  const dateStr = String(weddingDate.getDate()).padStart(2, "0");
  const monthStr = weddingDate.toLocaleString("default", { month: "long" }).toUpperCase();
  const yearStr = String(weddingDate.getFullYear());

  const cards = [
    { label: "Date", value: dateStr },
    { label: "Month", value: monthStr },
    { label: "Year", value: yearStr },
  ];

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

      <p className="mx-auto mt-4 max-w-md px-6 text-center text-sm tracking-wide text-[oklch(0.88_0.09_86)]/80 sm:text-base font-display">
        Scratch the golden foil on each card to reveal the sacred date of our union.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mx-auto mt-12 grid grid-cols-3 gap-3 sm:gap-6 px-4 sm:px-6 max-w-3xl"
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
            <ScratchCard content={c.value} label={c.label} />
          </motion.div>
        ))}
      </motion.div>

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
          className="px-8 py-3 rounded-full border border-[oklch(0.88_0.09_86)]/60 bg-[oklch(0.36_0.16_22)]/40 font-display text-sm tracking-[0.2em] text-[oklch(0.97_0.03_85)] backdrop-blur-md transition-all hover:scale-105 hover:border-[oklch(0.88_0.09_86)] hover:bg-[oklch(0.36_0.16_22)]/70 hover:shadow-[0_0_30px_rgba(244,63,94,0.3)] flex items-center gap-2 cursor-pointer"
        >
          <span>SHOWER BLESSINGS</span>
          <span className="text-rose-500 animate-pulse">❤</span>
        </button>
      </motion.div>
    </section>
  );
}
