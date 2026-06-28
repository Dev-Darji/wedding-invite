import { motion } from "framer-motion";
import mandala from "@/assets/mandala.png";
import { wedding } from "@/lib/wedding-config";

export function Footer() {
  return (
    <footer className="bg-royal relative overflow-hidden pt-24 pb-12 text-center text-[oklch(0.97_0.03_85)]">
      <motion.img
        src={mandala}
        alt=""
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute left-1/2 top-12 h-64 w-64 -translate-x-1/2 opacity-15"
      />
      <div className="relative mx-auto max-w-2xl px-6">
        <p className="font-script text-3xl text-[oklch(0.88_0.09_86)] sm:text-4xl">
          "Saath janam ka rishta"
        </p>
        <h3 className="text-gold-gradient mt-4 font-display text-3xl sm:text-4xl">
          {wedding.bride} &amp; {wedding.groom}
        </h3>
        <p className="mt-3 font-display text-sm tracking-[0.3em] text-[oklch(0.88_0.09_86)]/80">
          {wedding.dateDisplay.toUpperCase()} • {wedding.venue.name.toUpperCase()}
        </p>
        <div className="mx-auto mt-10 flex max-w-md items-center gap-4">
          <span className="ornate-divider flex-1" />
          <span className="text-[oklch(0.88_0.09_86)]" aria-hidden>❀</span>
          <span className="ornate-divider flex-1" />
        </div>
        <p className="mt-8 text-sm leading-relaxed text-[oklch(0.97_0.03_85)]/70">
          With the choicest blessings of our parents and the warmth of your presence,
          we begin a new chapter. Thank you for being part of our story.
        </p>
        <p className="mt-10 text-xs tracking-widest text-[oklch(0.88_0.09_86)]/60">
          MADE WITH ♥ &nbsp;•&nbsp; SHUBH VIVAH
        </p>
      </div>
    </footer>
  );
}
