import { motion } from "framer-motion";

export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="px-6 text-center"
    >
      <p className="font-script text-2xl text-[oklch(0.45_0.18_25)] sm:text-3xl">{eyebrow}</p>
      <h2 className="text-gold-gradient mt-2 font-display text-3xl font-bold sm:text-5xl">{title}</h2>
      <div className="mx-auto mt-5 flex max-w-xs items-center gap-3">
        <span className="ornate-divider flex-1" />
        <span className="text-[oklch(0.78_0.15_82)]" aria-hidden>❀</span>
        <span className="ornate-divider flex-1" />
      </div>
    </motion.div>
  );
}
