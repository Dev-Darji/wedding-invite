import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { wedding } from "@/lib/wedding-config";
import { SectionTitle } from "./SectionTitle";

export function Rsvp() {
  const [name, setName] = useState("");
  const [blessing, setBlessing] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [attending, setAttending] = useState<"yes" | "no">("yes");

  const fireConfetti = () => {
    const colors = ["#b8860b", "#f4d35e", "#ee2a7b", "#7f1d1d", "#fff3b0"];
    const end = Date.now() + 1500;
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors });
  };

  const incrementAdults = () => setAdults((prev) => Math.min(15, prev + 1));
  const decrementAdults = () => setAdults((prev) => Math.max(1, prev - 1));

  const incrementChildren = () => setChildren((prev) => Math.min(15, prev + 1));
  const decrementChildren = () => setChildren((prev) => Math.max(0, prev - 1));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fireConfetti();

    // Destination phone number specified by the user
    const phone = "9104635345";
    
    // Beautiful WhatsApp message template
    const msg = encodeURIComponent(
      `Namaste! 🙏\n\n` +
      `I'm RSVPing for *${wedding.bride} & ${wedding.groom}'s* Wedding.\n\n` +
      `• *Attending:* ${attending === "yes" ? "Yes, with joy! ✨" : "Regretfully, No 😔"}\n` +
      `• *Name / Family:* ${name || "—"}\n` +
      `${attending === "yes" ? `• *Adults:* ${adults}\n• *Children:* ${children}\n` : ""}` +
      `• *Blessing:* ${blessing || "—"}\n\n` +
      `With love and blessings!`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${phone}?text=${msg}`, "_blank", "noopener,noreferrer");
    }, 900);
  };

  return (
    <section id="rsvp" className="relative py-24 sm:py-32">
      <SectionTitle eyebrow="Your Presence" title="Kindly RSVP" />
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
        className="mx-auto mt-14 max-w-xl rounded-3xl p-6 sm:p-10 border border-[#c4a46a]/30 bg-[#faf7f0] shadow-xl text-left"
      >
        {/* Attendance (Yes/No) first in one row */}
        <div className="block mb-6">
          <span className="block text-center font-display text-xs sm:text-sm tracking-[0.2em] text-[#7e1e2d] font-bold uppercase mb-3">
            WILL YOU JOIN OUR CELEBRATION?
          </span>
          <div className="grid grid-cols-2 gap-4">
            {(["yes", "no"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setAttending(v)}
                className={`rounded-xl border py-3 font-display text-xs tracking-widest transition-all cursor-pointer font-bold ${
                  attending === v
                    ? "border-[#7e1e2d] bg-[#7e1e2d] text-white shadow-md"
                    : "border-[#7e1e2d]/30 bg-transparent text-[#7e1e2d] hover:bg-[#7e1e2d]/5"
                }`}
              >
                {v === "yes" ? "YES, WITH JOY ✨" : "NO, REGRETFULLY 😔"}
              </button>
            ))}
          </div>
        </div>

        {/* Guest counters side-by-side (rendered only if attending is YES) */}
        {attending === "yes" && (
          <div className="mb-6">
            <span className="block font-display text-xs tracking-[0.2em] text-[#7e1e2d] font-bold uppercase mb-3">
              GUEST COUNT
            </span>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {/* Adults Counter */}
              <div className="rounded-2xl border border-[#c4a46a]/35 bg-[#fbf9f4] p-4 text-center">
                <span className="block font-display text-[10px] tracking-[0.25em] text-[#2c5e43] font-bold uppercase mb-3">
                  ADULTS
                </span>
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={decrementAdults}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-[#c4a46a] text-[#7e1e2d] hover:bg-[#7e1e2d]/5 active:scale-95 transition-all text-lg font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-serif text-lg font-bold text-[#7e1e2d] min-w-[20px]">
                    {adults}
                  </span>
                  <button
                    type="button"
                    onClick={incrementAdults}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-[#c4a46a] text-[#7e1e2d] hover:bg-[#7e1e2d]/5 active:scale-95 transition-all text-lg font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children Counter */}
              <div className="rounded-2xl border border-[#c4a46a]/35 bg-[#fbf9f4] p-4 text-center">
                <span className="block font-display text-[10px] tracking-[0.25em] text-[#2c5e43] font-bold uppercase mb-3">
                  CHILDREN
                </span>
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={decrementChildren}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-[#c4a46a] text-[#7e1e2d] hover:bg-[#7e1e2d]/5 active:scale-95 transition-all text-lg font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-serif text-lg font-bold text-[#7e1e2d] min-w-[20px]">
                    {children}
                  </span>
                  <button
                    type="button"
                    onClick={incrementChildren}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-[#c4a46a] text-[#7e1e2d] hover:bg-[#7e1e2d]/5 active:scale-95 transition-all text-lg font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Your Name/Family Name input */}
        <label className="block mb-5">
          <span className="font-display text-xs tracking-[0.2em] text-[#7e1e2d] font-bold uppercase block mb-2">
            YOUR NAME / FAMILY NAME
          </span>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-[#c4a46a]/40 bg-[#fbf9f4] px-4 py-3.5 text-[#5c1c28] font-serif outline-none placeholder:text-[#7e1e2d]/40 focus:border-[#7e1e2d] focus:ring-1 focus:ring-[#7e1e2d]/20"
            placeholder="e.g. Mehta Family"
          />
        </label>

        {/* Blessing Message input */}
        <label className="block mb-6">
          <span className="font-display text-xs tracking-[0.2em] text-[#7e1e2d] font-bold uppercase block mb-2">
            A BLESSING OR MESSAGE (OPTIONAL)
          </span>
          <textarea
            value={blessing}
            onChange={(e) => setBlessing(e.target.value)}
            rows={3}
            className="w-full rounded-2xl border border-[#c4a46a]/40 bg-[#fbf9f4] px-4 py-3.5 text-[#5c1c28] font-serif outline-none placeholder:text-[#7e1e2d]/40 focus:border-[#7e1e2d] focus:ring-1 focus:ring-[#7e1e2d]/20 resize-none"
            placeholder="Write your warm wishes here..."
          />
        </label>

        {/* Send to WhatsApp button */}
        <button
          type="submit"
          className="w-full rounded-full bg-[#7e1e2d] px-8 py-4 font-display text-xs tracking-[0.25em] text-white shadow-lg hover:bg-[#631420] transition-all hover:scale-[1.01] cursor-pointer font-bold text-center block"
        >
          SEND RSVP TO WHATSAPP ✨
        </button>
        
        <p className="mt-3 text-center text-[10px] tracking-wider text-[#7e1e2d]/60 font-serif">
          A pre-filled message will open on your WhatsApp.
        </p>
      </motion.form>
    </section>
  );
}
