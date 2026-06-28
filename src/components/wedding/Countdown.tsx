import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding-config";
import { SectionTitle } from "./SectionTitle";

function calc(target: number) {
  const diff = Math.max(0, target - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

export function Countdown() {
  const target = new Date(wedding.date).getTime();
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    setT(calc(target));
    const id = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: t.d },
    { label: "Hours", value: t.h },
    { label: "Minutes", value: t.m },
    { label: "Seconds", value: t.s },
  ];

  return (
    <section className="relative py-24 sm:py-32">
      <SectionTitle eyebrow="Save the Date" title="The Countdown Begins" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 px-6 sm:grid-cols-4 sm:gap-6"
      >
        {units.map((u) => (
          <div
            key={u.label}
            className="glass-card relative overflow-hidden rounded-2xl px-4 py-8 text-center"
          >
            <div className="text-gold-gradient font-display text-4xl font-bold sm:text-6xl">
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="mt-3 font-display text-xs tracking-[0.3em] text-[oklch(0.88_0.09_86)] sm:text-sm">
              {u.label.toUpperCase()}
            </div>
            <div className="pointer-events-none absolute inset-x-4 bottom-2 h-px bg-gradient-to-r from-transparent via-[oklch(0.78_0.15_82)] to-transparent" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
