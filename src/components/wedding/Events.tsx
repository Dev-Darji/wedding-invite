import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { wedding } from "@/lib/wedding-config";

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
    end: "20261205T150000"
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
    end: "20261206T130000"
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
    end: "20261207T235900"
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
    end: "20261208T233000"
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
    end: "20261209T230000"
  }
];

export function Events() {
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

      {/* Mobile: sticky stacking cards */}
      <div className="mx-auto mt-12 max-w-md px-5 sm:hidden">
        {EVENTS_DATA.map((e, i) => (
          <div
            key={e.name}
            className="sticky"
            style={{
              top: `${80 + i * 22}px`,
              zIndex: i + 1,
              marginBottom: i === EVENTS_DATA.length - 1 ? 0 : "18vh",
            }}
          >
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-[oklch(0.78_0.15_82)]/60 bg-gradient-to-br from-[oklch(0.97_0.02_85)] via-[oklch(0.94_0.04_84)] to-[oklch(0.88_0.09_86)] p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.25)] min-h-[395px] flex flex-col justify-between"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[oklch(0.78_0.15_82)]/30 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-3 py-1 text-[9px] tracking-[0.2em] font-bold rounded-full border ${e.tagColor}`}>
                    {e.tag}
                  </span>
                </div>
                
                <h3 className="mt-4 font-display text-2xl font-bold text-[oklch(0.24_0.13_22)]">{e.ceremonyName}</h3>
                
                <div className="mt-4 space-y-1 text-xs text-[oklch(0.35_0.05_25)]">
                  <p className="flex items-center gap-2"><span aria-hidden>📅</span> {e.date}</p>
                  <p className="flex items-center gap-2"><span aria-hidden>⏰</span> {e.time}</p>
                  <p className="flex items-center gap-2"><span aria-hidden>📍</span> {e.place}</p>
                </div>

                <p className="mt-4 text-xs text-[oklch(0.35_0.05_25)]/90 line-clamp-2 leading-relaxed">
                  {e.summary}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span className="text-[oklch(0.35_0.05_25)]/60 uppercase tracking-wider text-[8px]">Dress Code:</span>
                  <span className="flex items-center gap-1.5 font-medium text-[oklch(0.24_0.13_22)]">
                    <span className={`h-2 w-2 rounded-full ${e.dressCodeColor}`} />
                    {e.dressCode}
                  </span>
                </div>

                <div className="my-4 h-px bg-gradient-to-r from-transparent via-[oklch(0.45_0.18_25)]/15 to-transparent" />

                <div className="flex gap-3 justify-end">
                  <a
                    href={getMapsUrl(e.place)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[oklch(0.45_0.18_25)]/20 hover:border-[oklch(0.45_0.18_25)] bg-[oklch(0.97_0.02_85)]/80 text-[oklch(0.45_0.18_25)] transition-all inline-flex items-center gap-1.5 text-[10px] font-display tracking-widest px-3 h-8 leading-none cursor-pointer"
                  >
                    <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span className="translate-y-[0.5px]">MAP</span>
                  </a>
                  <a
                    href={getCalendarUrl(e)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[oklch(0.45_0.18_25)]/20 hover:border-[oklch(0.45_0.18_25)] bg-[oklch(0.97_0.02_85)]/80 text-[oklch(0.45_0.18_25)] transition-all inline-flex items-center gap-1.5 text-[10px] font-display tracking-widest px-3 h-8 leading-none cursor-pointer"
                  >
                    <Calendar className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                    <span className="translate-y-[0.5px]">CALENDAR</span>
                  </a>
                </div>
              </div>
            </motion.article>
          </div>
        ))}
      </div>

      {/* Desktop/tablet grid */}
      <div className="mx-auto mt-14 hidden max-w-6xl gap-6 px-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {EVENTS_DATA.map((e, i) => (
          <motion.article
            key={e.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group relative overflow-hidden rounded-2xl border border-[oklch(0.78_0.15_82)]/40 bg-gradient-to-br from-[oklch(0.97_0.02_85)] to-[oklch(0.91_0.05_82)] p-7 shadow-[var(--shadow-gold)] transition-all hover:shadow-[0_20px_50px_-15px_oklch(0.45_0.18_25/0.3)] flex flex-col justify-between"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[oklch(0.78_0.15_82)]/20 blur-3xl transition-all group-hover:bg-[oklch(0.78_0.15_82)]/40" />
            <div className="relative flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-3 py-1 text-[9px] tracking-[0.2em] font-bold rounded-full border ${e.tagColor}`}>
                    {e.tag}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold text-[oklch(0.24_0.13_22)]">{e.ceremonyName}</h3>
                
                <div className="mt-4 space-y-1.5 text-xs text-[oklch(0.35_0.05_25)]">
                  <p className="flex items-center gap-2"><span aria-hidden>📅</span> {e.date}</p>
                  <p className="flex items-center gap-2"><span aria-hidden>⏰</span> {e.time}</p>
                  <p className="flex items-center gap-2"><span aria-hidden>📍</span> {e.place}</p>
                </div>

                <p className="mt-4 text-xs text-[oklch(0.35_0.05_25)]/95 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                  {e.summary}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span className="text-[oklch(0.35_0.05_25)]/60 uppercase tracking-wider text-[8px]">Dress Code:</span>
                  <span className="flex items-center gap-1.5 font-medium text-[oklch(0.24_0.13_22)]">
                    <span className={`h-2 w-2 rounded-full ${e.dressCodeColor}`} />
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
                    className="rounded-full border border-[oklch(0.45_0.18_25)]/20 hover:border-[oklch(0.45_0.18_25)] bg-[oklch(0.97_0.02_85)]/80 hover:bg-[oklch(0.91_0.05_82)] text-[oklch(0.45_0.18_25)] transition-all inline-flex items-center gap-1.5 text-[10px] font-display tracking-widest px-3 h-8 leading-none cursor-pointer shadow-sm hover:shadow"
                  >
                    <MapPin className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    <span className="translate-y-[0.5px]">MAP</span>
                  </a>
                  <a
                    href={getCalendarUrl(e)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[oklch(0.45_0.18_25)]/20 hover:border-[oklch(0.45_0.18_25)] bg-[oklch(0.97_0.02_85)]/80 hover:bg-[oklch(0.91_0.05_82)] text-[oklch(0.45_0.18_25)] transition-all inline-flex items-center gap-1.5 text-[10px] font-display tracking-widest px-3 h-8 leading-none cursor-pointer shadow-sm hover:shadow"
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
    </section>
  );
}
