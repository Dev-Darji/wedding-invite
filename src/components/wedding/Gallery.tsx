import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import g1 from "@/assets/gallery1.jpg";
import g2 from "@/assets/gallery2.jpg";
import g3 from "@/assets/gallery3.jpg";
import g4 from "@/assets/gallery4.jpg";
import g5 from "@/assets/gallery5.jpg";
import g6 from "@/assets/gallery6.jpg";

const images = [
  { src: g1, alt: "Mehndi" },
  { src: g2, alt: "Sangeet" },
  { src: g3, alt: "Haldi" },
  { src: g4, alt: "Mandap" },
  { src: g5, alt: "Baraat" },
  { src: g6, alt: "Reception" },
];

function MobileHorizontalGallery({ onOpen }: { onOpen: (i: number) => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  // Move strip horizontally as the user scrolls vertically
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((images.length - 1) / images.length) * 100}%`]
  );

  return (
    <div
      ref={wrapRef}
      className="relative mt-10 sm:hidden"
      style={{ height: `${images.length * 90}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x, width: `${images.length * 100}%` }}
          className="flex h-[78vh]"
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              className="flex h-full w-screen shrink-0 items-center justify-center px-5"
            >
              <button
                type="button"
                onClick={() => onOpen(i)}
                className="group relative h-full w-full overflow-hidden rounded-3xl border-2 border-[oklch(0.78_0.15_82)]/60 shadow-[0_30px_80px_-20px_oklch(0.24_0.13_22/0.6)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.78_0.15_82)]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.24_0.13_22)]/85 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                  <p className="font-script text-2xl text-[oklch(0.88_0.09_86)]">
                    {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                  </p>
                  <p className="font-display text-2xl tracking-[0.2em] text-[oklch(0.97_0.03_85)]">
                    {img.alt.toUpperCase()}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </motion.div>

        {/* progress dots */}
        <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center gap-2">
          {images.map((_, i) => (
            <ProgressDot key={i} progress={scrollYProgress} index={i} total={images.length} />
          ))}
        </div>
        <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 font-display text-[10px] tracking-[0.25em] text-[oklch(0.88_0.09_86)] backdrop-blur">
          SCROLL ↓
        </div>
      </div>
    </div>
  );
}

function ProgressDot({
  progress,
  index,
  total,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
}) {
  const opacity = useTransform(progress, (v) => {
    const active = Math.min(total - 1, Math.floor(v * total));
    return active === index ? 1 : 0.35;
  });
  const scale = useTransform(progress, (v) => {
    const active = Math.min(total - 1, Math.floor(v * total));
    return active === index ? 1.4 : 1;
  });
  return (
    <motion.span
      style={{ opacity, scale }}
      className="block h-1.5 w-1.5 rounded-full bg-[oklch(0.88_0.09_86)]"
    />
  );
}

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-24 sm:py-32">
      <SectionTitle eyebrow="Memories" title="Moments to Cherish" />

      {/* Mobile: horizontal scroll-jack */}
      <MobileHorizontalGallery onOpen={setOpen} />

      {/* Desktop grid */}
      <div className="mx-auto mt-14 hidden max-w-6xl grid-cols-3 gap-5 px-6 sm:grid">
        {images.map((img, i) => (
          <motion.button
            key={img.src}
            type="button"
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="group relative aspect-[4/5] overflow-hidden rounded-xl border-2 border-[oklch(0.78_0.15_82)]/40 shadow-[var(--shadow-gold)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.78_0.15_82)]"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.24_0.13_22)]/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute bottom-3 left-3 font-display text-sm tracking-widest text-[oklch(0.97_0.03_85)] opacity-0 transition-opacity group-hover:opacity-100">
              {img.alt.toUpperCase()}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.img
              key={open}
              src={images[open].src}
              alt={images[open].alt}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-h-[90vh] max-w-[92vw] rounded-2xl border-2 border-[oklch(0.88_0.09_86)] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-[oklch(0.36_0.16_22)] text-2xl text-[oklch(0.97_0.03_85)] hover:bg-[oklch(0.45_0.18_25)]"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
