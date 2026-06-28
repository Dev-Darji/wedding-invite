import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import mandala from "@/assets/mandala.png";

export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="bg-royal fixed inset-0 z-[100] flex flex-col items-center justify-center"
          exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
        >
          <motion.img
            src={mandala}
            alt=""
            aria-hidden
            className="h-56 w-56 opacity-90 drop-shadow-[0_0_40px_rgba(244,211,94,0.5)] sm:h-72 sm:w-72"
            initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
          />
          <motion.p
            className="text-gold-gradient mt-8 font-display text-2xl tracking-[0.4em] sm:text-3xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
          >
            SHUBH VIVAH
          </motion.p>
          <motion.span
            className="mt-3 text-xs tracking-[0.5em] text-[oklch(0.88_0.09_86)]/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            • A ROYAL INVITATION •
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
