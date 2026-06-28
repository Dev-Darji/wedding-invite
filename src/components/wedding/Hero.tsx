import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";
import corner from "@/assets/corner.png";
import { wedding } from "@/lib/wedding-config";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-letter",
        { y: 80, opacity: 0, rotateX: -60 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.4,
          ease: "power4.out",
          stagger: 0.05,
          delay: 2.6,
        }
      );
      gsap.fromTo(
        ".hero-sub",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 3.6, stagger: 0.15 }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const groomLetters = wedding.groom.split("");
  const brideLetters = wedding.bride.split("");

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden
      />
      <div className="bg-royal absolute inset-0 -z-10 opacity-70" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-transparent to-black/70" aria-hidden />

      {/* corners */}
      <img src={corner} alt="" aria-hidden className="pointer-events-none absolute left-0 top-0 h-32 w-32 opacity-80 sm:h-48 sm:w-48" />
      <img src={corner} alt="" aria-hidden className="pointer-events-none absolute right-0 top-0 h-32 w-32 -scale-x-100 opacity-80 sm:h-48 sm:w-48" />
      <img src={corner} alt="" aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 -scale-y-100 opacity-80 sm:h-48 sm:w-48" />
      <img src={corner} alt="" aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 -scale-100 opacity-80 sm:h-48 sm:w-48" />

      <div className="relative z-20 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="text-gold-gradient mb-4 font-script text-3xl sm:text-5xl"
        >
          With the blessings of our families
        </motion.p>

        <h1 className="flex flex-col items-center justify-center font-display text-5xl font-bold tracking-wider text-[oklch(0.97_0.03_85)] sm:text-7xl md:text-8xl leading-none">
          <span className="block">
            {groomLetters.map((l, i) => (
              <span key={`groom-${i}`} className="hero-letter inline-block" style={{ whiteSpace: "pre" }}>
                {l === " " ? "\u00A0" : l}
              </span>
            ))}
          </span>

          <span
            className="my-2 block cursor-default select-none font-serif text-3xl sm:text-4xl md:text-5xl text-gold-gradient drop-shadow-[0_2px_10px_rgba(196,164,106,0.3)] italic"
            aria-hidden="true"
          >
            &
          </span>

          <span className="block">
            {brideLetters.map((l, i) => (
              <span key={`bride-${i}`} className="hero-letter inline-block" style={{ whiteSpace: "pre" }}>
                {l === " " ? "\u00A0" : l}
              </span>
            ))}
          </span>
        </h1>

        <div className="hero-sub mx-auto mt-8 flex max-w-lg items-center gap-4">
          <span className="ornate-divider flex-1" />
          <span className="text-gold-gradient font-display text-sm tracking-[0.4em] sm:text-base">
            ARE GETTING MARRIED
          </span>
          <span className="ornate-divider flex-1" />
        </div>

        <p className="hero-sub mt-6 font-script text-2xl text-[oklch(0.88_0.09_86)] sm:text-3xl">
          {wedding.tagline}
        </p>

        {/* Center single Diya */}
        <div
          className="hero-sub mt-8 flex justify-center text-4xl sm:text-5xl animate-diya-flicker select-none cursor-default"
          aria-hidden="true"
        >
          🪔
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[oklch(0.91_0.05_82)]"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-hidden
      >
        <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
          <rect x="1" y="1" width="22" height="34" rx="11" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="10" r="3" fill="currentColor" />
        </svg>
      </motion.div>
    </section>
  );
}
