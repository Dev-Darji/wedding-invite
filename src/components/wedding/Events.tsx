import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, ZoomIn } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { wedding } from "@/lib/wedding-config";
import g1 from "@/assets/gallery1.jpg";
import g2 from "@/assets/gallery2.jpg";
import g3 from "@/assets/gallery3.jpg";
import g4 from "@/assets/gallery4.jpg";
import g5 from "@/assets/gallery5.jpg";
import receptionImg from "@/assets/reception.png";

interface EventDetails {
  name: string;
  ceremonyName: string;
  tag: string;
  tagColor: string;
  date: string;
  time: string;
  place: string;
  icon: string;
  summary: string;
  dressCode: string;
  dressCodeColor: string;
  start: string;
  end: string;
  image: string;
}

const EVENTS_DATA: EventDetails[] = [
  {
    name: "Mehndi",
    ceremonyName: "Mehndi Ceremony",
    tag: "MEHNDI",
    tagColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    date: "5 Dec 2026",
    time: "11:00 AM",
    place: "Palace Courtyard",
    icon: "🌿",
    summary: "Adorning the hands with elegant henna patterns, accompanied by traditional folk songs, music, and festive dancing.",
    dressCode: "Green",
    dressCodeColor: "bg-emerald-600",
    start: "20261205T110000",
    end: "20261205T150000",
    image: g1
  },
  {
    name: "Haldi",
    ceremonyName: "Haldi Ceremony",
    tag: "HALDI",
    tagColor: "bg-amber-50 text-amber-800 border-amber-200",
    date: "6 Dec 2026",
    time: "10:00 AM",
    place: "Garden Lawn",
    icon: "🌼",
    summary: "A vibrant morning ritual where the couple is bathed in auspicious turmeric paste to bring a radiant glow for the wedding.",
    dressCode: "Yellow",
    dressCodeColor: "bg-amber-500",
    start: "20261206T100000",
    end: "20261206T130000",
    image: g3
  },
  {
    name: "Sangeet",
    ceremonyName: "Sangeet & Dance",
    tag: "SANGEET",
    tagColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
    date: "7 Dec 2026",
    time: "7:30 PM",
    place: "Durbar Hall",
    icon: "🎶",
    summary: "An extraordinary musical evening filled with beautiful dance performances, high energy music, and grand celebrations.",
    dressCode: "Royal & Glitzy",
    dressCodeColor: "bg-indigo-600",
    start: "20261207T193000",
    end: "20261207T235900",
    image: g2
  },
  {
    name: "Baraat & Wedding",
    ceremonyName: "Hastmelaap & Phere",
    tag: "WEDDING",
    tagColor: "bg-rose-50 text-rose-800 border-rose-200",
    date: "8 Dec 2026",
    time: "5:30 PM",
    place: "Royal Mandap",
    icon: "🐎",
    summary: "The grand Baraat arrival, followed by the sacred Hastmelaap and Phere rituals under a beautifully decorated Mandap.",
    dressCode: "Indian Traditional",
    dressCodeColor: "bg-rose-600",
    start: "20261208T173000",
    end: "20261208T233000",
    // Note: g4 is the Mandap image, which fits Phere/Wedding beautifully.
    // If you prefer the Baraat image, you can switch this to g5.
    image: g4
  },
  {
    name: "Reception",
    ceremonyName: "Grand Reception",
    tag: "RECEPTION",
    tagColor: "bg-blue-50 text-blue-800 border-blue-200",
    date: "9 Dec 2026",
    time: "7:00 PM",
    place: "Sheesh Mahal",
    icon: "✨",
    summary: "A formal dinner and celebration to toast the newlyweds. Join us for a beautiful night of speeches, drinks, and dining.",
    dressCode: "Indo Western",
    dressCodeColor: "bg-blue-600",
    start: "20261209T190000",
    end: "20261209T230000",
    image: receptionImg
  }
];

export function Events() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const getMapsUrl = (place: string) => {
    const query = `Umaid Bhawan Palace, ${place}, Jodhpur, Rajasthan`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  };

  const getCalendarUrl = (ev: EventDetails) => {
    const title = encodeURIComponent(`${ev.ceremonyName} — Arjun & Aanya's Wedding`);
    const details = encodeURIComponent(`${ev.summary}\n\nDress Code: ${ev.dressCode}`);
    const location = encodeURIComponent(`${ev.place}, Umaid Bhawan Palace, Jodhpur`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${ev.start}/${ev.end}&details=${details}&location=${location}`;
  };

  return (
    <section className="relative py-24 sm:py-32">
      <SectionTitle eyebrow="Festivities" title="Wedding Celebrations" />

      {/* Unified grid layout: 1 column on mobile (no overlapping), 2 on tablet, 3 on desktop */}
      <div className="mx-auto mt-12 max-w-md px-5 sm:max-w-6xl sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EVENTS_DATA.map((e, i) => (
          <motion.article
            key={e.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group relative overflow-hidden rounded-3xl border border-[oklch(0.78_0.15_82)]/45 bg-gradient-to-br from-[oklch(0.97_0.02_85)] to-[oklch(0.91_0.05_82)] shadow-[var(--shadow-gold)] transition-all hover:shadow-[0_20px_50px_-15px_oklch(0.45_0.18_25/0.25)] flex flex-col justify-between"
          >
            {/* Image section at the top of the card */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-3xl border-b border-[oklch(0.78_0.15_82)]/25">
              <img
                src={e.image}
                alt={e.ceremonyName}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 cursor-pointer"
                onClick={() => setLightboxImage(e.image)}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating tag */}
              <span className={`absolute top-4 left-4 inline-block px-3 py-1 text-[9px] tracking-[0.2em] font-bold rounded-full border shadow-sm backdrop-blur-sm ${e.tagColor}`}>
                {e.tag}
              </span>

              {/* Hover Zoom-in Icon */}
              <button
                onClick={() => setLightboxImage(e.image)}
                className="absolute right-4 bottom-4 p-2 rounded-full bg-black/40 text-[oklch(0.97_0.03_85)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm hover:bg-black/60 cursor-pointer"
                title="View Full Image"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>

            {/* Content section below the image */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold text-[oklch(0.24_0.13_22)] transition-colors duration-300 group-hover:text-[oklch(0.36_0.16_22)]">
                  {e.ceremonyName}
                </h3>
                
                {/* Decorative gold-tone separator line */}
                <div className="mt-3 mb-4 h-[1px] w-12 bg-gradient-to-r from-[oklch(0.78_0.15_82)] to-transparent" />
                
                <div className="space-y-2 text-xs text-[oklch(0.35_0.05_25)]">
                  <p className="flex items-center gap-2.5">
                    <span aria-hidden className="text-base shrink-0">📅</span>
                    <span className="font-medium text-[oklch(0.24_0.13_22)]">{e.date}</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <span aria-hidden className="text-base shrink-0">⏰</span>
                    <span>{e.time}</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <span aria-hidden className="text-base shrink-0">📍</span>
                    <span className="font-medium">{e.place}</span>
                  </p>
                </div>

                <p className="mt-4 text-xs text-[oklch(0.35_0.05_25)]/90 leading-relaxed min-h-[3rem]">
                  {e.summary}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="text-[oklch(0.35_0.05_25)]/60 uppercase tracking-wider text-[10px] font-bold">Dress Code:</span>
                  <span className="flex items-center gap-1.5 font-semibold text-[oklch(0.24_0.13_22)] bg-[oklch(0.97_0.02_85)]/90 px-3 py-1 rounded-full border border-[oklch(0.78_0.15_82)]/20 shadow-sm text-xs">
                    <span className={`h-2.5 w-2.5 rounded-full ${e.dressCodeColor} shrink-0`} />
                    {e.dressCode}
                  </span>
                </div>
              </div>

              <div>
                <div className="my-5 h-px bg-gradient-to-r from-transparent via-[oklch(0.45_0.18_25)]/15 to-transparent" />

                <div className="flex gap-3 justify-end">
                  <a
                    href={getMapsUrl(e.place)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[oklch(0.45_0.18_25)]/20 hover:border-[oklch(0.45_0.18_25)] bg-[oklch(0.97_0.02_85)]/80 hover:bg-[oklch(0.91_0.05_82)] text-[oklch(0.45_0.18_25)] transition-all inline-flex items-center gap-1.5 text-[10px] font-display tracking-widest px-4 h-8.5 leading-none cursor-pointer shadow-sm hover:shadow"
                  >
                    <MapPin className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    <span className="translate-y-[0.5px]">MAP</span>
                  </a>
                  <a
                    href={getCalendarUrl(e)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[oklch(0.45_0.18_25)]/20 hover:border-[oklch(0.45_0.18_25)] bg-[oklch(0.97_0.02_85)]/80 hover:bg-[oklch(0.91_0.05_82)] text-[oklch(0.45_0.18_25)] transition-all inline-flex items-center gap-1.5 text-[10px] font-display tracking-widest px-4 h-8.5 leading-none cursor-pointer shadow-sm hover:shadow"
                  >
                    <Calendar className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                    <span className="translate-y-[0.5px]">CALENDAR</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Lightbox Pop-up */}
      <AnimatePresence>
        {lightboxImage !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.img
              src={lightboxImage}
              alt="Celebration Photo"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-h-[90vh] max-w-[92vw] rounded-2xl border-2 border-[oklch(0.88_0.09_86)] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-[oklch(0.36_0.16_22)] text-2xl text-[oklch(0.97_0.03_85)] hover:bg-[oklch(0.45_0.18_25)] cursor-pointer"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
