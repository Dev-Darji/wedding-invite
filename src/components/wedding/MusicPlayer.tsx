import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const MUSIC_SRC = "/wedding-music.mp3"; // drop your file into /public to replace

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const a = new Audio(MUSIC_SRC);
    a.loop = true;
    a.volume = 0.4;
    a.preload = "none";
    audioRef.current = a;
    a.addEventListener("error", () => setAvailable(false));
    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        setAvailable(false);
      }
    }
  };

  if (!available) return null;

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 3, duration: 0.6 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full border border-[oklch(0.88_0.09_86)]/60 bg-[oklch(0.24_0.13_22)]/80 text-[oklch(0.88_0.09_86)] shadow-[0_10px_30px_-10px_oklch(0.78_0.15_82/0.7)] backdrop-blur-md"
    >
      {playing ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
      {playing && (
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[oklch(0.78_0.15_82)]/40" />
      )}
    </motion.button>
  );
}
