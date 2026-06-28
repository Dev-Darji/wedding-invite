import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding-config";
import { SectionTitle } from "./SectionTitle";

export function Families() {
  const { groom, bride } = wedding.family;

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-black/5">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[oklch(0.78_0.15_82)]/5 blur-[120px]" aria-hidden />

      <SectionTitle eyebrow="United in Love" title="With Blessings of Our Families" />

      <div className="mx-auto mt-16 max-w-5xl px-6 grid gap-10 md:grid-cols-2 relative z-10">
        
        {/* Groom's Family Card (Sharma Family) */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-[#7e1e2d] rounded-3xl p-8 sm:p-10 relative overflow-hidden group hover:shadow-[0_20px_50px_-10px_rgba(126,30,45,0.4)] transition-all duration-500 border border-amber-500/35"
        >
          {/* Subtle gold flare */}
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl group-hover:bg-amber-500/15 transition-all duration-500" />
          
          <div className="relative text-left">
            {/* Header with Leaf Icon */}
            <div className="flex items-center gap-2 font-display text-[11px] tracking-[0.25em] text-amber-300 font-bold uppercase mb-8 border-b border-amber-500/20 pb-3">
              <span>🌿</span>
              <span>GROOM'S SIDE — SHARMA FAMILY</span>
            </div>

            <div className="space-y-6">
              {/* Grandparents */}
              <div>
                <span className="font-display text-[10px] tracking-[0.2em] text-amber-400 font-bold uppercase block mb-2">
                  GRANDPARENTS
                </span>
                <div className="space-y-1 font-serif text-[17px] sm:text-lg text-white leading-relaxed">
                  <p>Late Mr. Dwarka Prasad Sharma</p>
                  <p>Mrs. Savitri Devi Sharma</p>
                </div>
              </div>

              {/* Parents */}
              <div>
                <span className="font-display text-[10px] tracking-[0.2em] text-amber-400 font-bold uppercase block mb-2">
                  PARENTS
                </span>
                <div className="space-y-1 font-serif text-[17px] sm:text-lg text-white leading-relaxed">
                  <p>Mr. Rajesh Sharma</p>
                  <p>Mrs. Sunita Sharma</p>
                </div>
              </div>

              {/* Siblings */}
              <div>
                <span className="font-display text-[10px] tracking-[0.2em] text-amber-400 font-bold uppercase block mb-2">
                  SIBLINGS
                </span>
                <div className="space-y-1.5 font-serif text-[17px] sm:text-lg text-white leading-relaxed">
                  <p className="flex items-baseline gap-2">
                    <span>Rohan Sharma</span>
                    <span className="text-xs text-amber-300/60 font-sans italic">(Brother)</span>
                  </p>
                  <p className="flex items-baseline gap-2">
                    <span>Kavita Sharma</span>
                    <span className="text-xs text-amber-300/60 font-sans italic">(Sister)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bride's Family Card (Verma Family) */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-[#7e1e2d] rounded-3xl p-8 sm:p-10 relative overflow-hidden group hover:shadow-[0_20px_50px_-10px_rgba(126,30,45,0.4)] transition-all duration-500 border border-amber-500/35"
        >
          {/* Subtle gold flare */}
          <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl group-hover:bg-amber-500/15 transition-all duration-500" />

          <div className="relative text-left">
            {/* Header with Leaf Icon */}
            <div className="flex items-center gap-2 font-display text-[11px] tracking-[0.25em] text-amber-300 font-bold uppercase mb-8 border-b border-amber-500/20 pb-3">
              <span>🌿</span>
              <span>BRIDE'S SIDE — VERMA FAMILY</span>
            </div>

            <div className="space-y-6">
              {/* Grandparents */}
              <div>
                <span className="font-display text-[10px] tracking-[0.2em] text-amber-400 font-bold uppercase block mb-2">
                  GRANDPARENTS
                </span>
                <div className="space-y-1 font-serif text-[17px] sm:text-lg text-white leading-relaxed">
                  <p>Late Mr. Ram Gopal Verma</p>
                  <p>Mrs. Kanti Devi Verma</p>
                </div>
              </div>

              {/* Parents */}
              <div>
                <span className="font-display text-[10px] tracking-[0.2em] text-amber-400 font-bold uppercase block mb-2">
                  PARENTS
                </span>
                <div className="space-y-1 font-serif text-[17px] sm:text-lg text-white leading-relaxed">
                  <p>Mr. Sanjay Verma</p>
                  <p>Mrs. Meenakshi Verma</p>
                </div>
              </div>

              {/* Siblings */}
              <div>
                <span className="font-display text-[10px] tracking-[0.2em] text-amber-400 font-bold uppercase block mb-2">
                  SIBLINGS
                </span>
                <div className="space-y-1.5 font-serif text-[17px] sm:text-lg text-white leading-relaxed">
                  <p className="flex items-baseline gap-2">
                    <span>Aditya Verma</span>
                    <span className="text-xs text-amber-300/60 font-sans italic">(Brother)</span>
                  </p>
                  <p className="flex items-baseline gap-2">
                    <span>Diya Verma</span>
                    <span className="text-xs text-amber-300/60 font-sans italic">(Sister)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
