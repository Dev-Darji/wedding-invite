import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding-config";
import { SectionTitle } from "./SectionTitle";

export function Venue() {
  return (
    <section className="relative py-24 sm:py-32">
      <SectionTitle eyebrow="The Setting" title="Venue" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
        className="mx-auto mt-14 grid max-w-6xl gap-8 px-6 lg:grid-cols-2 lg:items-stretch"
      >
        <div className="flex flex-col justify-center rounded-2xl border border-[oklch(0.78_0.15_82)]/40 bg-gradient-to-br from-[oklch(0.97_0.02_85)] to-[oklch(0.91_0.05_82)] p-8 shadow-[var(--shadow-gold)] sm:p-10">
          <p className="font-script text-3xl text-[oklch(0.45_0.18_25)]">Join us at</p>
          <h3 className="mt-2 font-display text-3xl text-[oklch(0.24_0.13_22)] sm:text-4xl">
            {wedding.venue.name}
          </h3>
          <p className="mt-4 leading-relaxed text-[oklch(0.35_0.05_25)]">{wedding.venue.address}</p>
          <a
            href={wedding.venue.mapsLink}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[oklch(0.36_0.16_22)] px-6 py-3 font-display text-sm tracking-widest text-[oklch(0.97_0.03_85)] transition-all hover:scale-105 hover:bg-[oklch(0.45_0.18_25)] hover:shadow-[0_10px_30px_-10px_oklch(0.45_0.18_25/0.6)]"
          >
            GET DIRECTIONS →
          </a>
        </div>
        <div className="relative overflow-hidden rounded-2xl border-2 border-[oklch(0.78_0.15_82)]/50 shadow-[var(--shadow-royal)]">
          <iframe
            title={`Map of ${wedding.venue.name}`}
            src={wedding.venue.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full lg:h-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
