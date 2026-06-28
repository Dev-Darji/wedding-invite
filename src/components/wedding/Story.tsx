import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding-config";
import { SectionTitle } from "./SectionTitle";
import coupleImg from "@/assets/couple.jpg";

export function Story() {
  return (
    <section className="relative py-24 sm:py-32">
      <SectionTitle eyebrow="Our Journey" title="A Love Story" />
      <div className="mx-auto mt-16 grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[oklch(0.78_0.15_82)] via-[oklch(0.45_0.18_25)] to-[oklch(0.42_0.13_160)] opacity-70 blur-2xl" />
          <img
            src={coupleImg}
            alt="The couple"
            loading="lazy"
            width={1280}
            height={1600}
            className="relative h-auto w-full rounded-[2rem] border-4 border-[oklch(0.88_0.09_86)]/70 object-cover shadow-[var(--shadow-royal)]"
          />
        </motion.div>

        <ol className="relative ml-3 space-y-10 border-l-2 border-dashed border-[oklch(0.78_0.15_82)]/60 pl-8">
          {wedding.story.map((s, i) => (
            <motion.li
              key={s.year}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative"
            >
              <span className="absolute -left-[42px] top-1 grid h-6 w-6 place-items-center rounded-full bg-[oklch(0.36_0.16_22)] text-[oklch(0.88_0.09_86)] ring-4 ring-[oklch(0.97_0.02_85)]">
                ❀
              </span>
              <p className="font-display text-sm tracking-[0.3em] text-[oklch(0.45_0.18_25)]">{s.year}</p>
              <h3 className="mt-1 font-display text-2xl text-[oklch(0.24_0.13_22)]">{s.title}</h3>
              <p className="mt-2 max-w-md text-[oklch(0.35_0.05_25)]">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
