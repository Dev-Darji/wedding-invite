import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect } from "react";
import { Loader } from "@/components/wedding/Loader";
import { Hero } from "@/components/wedding/Hero";
import { ScratchDate } from "@/components/wedding/ScratchDate";
import { Families } from "@/components/wedding/Families";
import { wedding } from "@/lib/wedding-config";

const PetalsBackground = lazy(() =>
  import("@/components/wedding/PetalsBackground").then((m) => ({ default: m.PetalsBackground }))
);
const Story = lazy(() => import("@/components/wedding/Story").then((m) => ({ default: m.Story })));
const Events = lazy(() => import("@/components/wedding/Events").then((m) => ({ default: m.Events })));
const Venue = lazy(() => import("@/components/wedding/Venue").then((m) => ({ default: m.Venue })));
const Rsvp = lazy(() => import("@/components/wedding/Rsvp").then((m) => ({ default: m.Rsvp })));
const MusicPlayer = lazy(() =>
  import("@/components/wedding/MusicPlayer").then((m) => ({ default: m.MusicPlayer }))
);
const Footer = lazy(() => import("@/components/wedding/Footer").then((m) => ({ default: m.Footer })));

const title = `${wedding.bride} & ${wedding.groom} — A Royal Indian Wedding`;
const description = `Join ${wedding.bride} & ${wedding.groom} on ${wedding.dateDisplay} at ${wedding.venue.name}. RSVP to our luxury Indian wedding celebration.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className="relative">
      <Loader />
      <Suspense fallback={null}>
        <PetalsBackground />
      </Suspense>
      <Hero />
      <ScratchDate />
      <Families />
      <Suspense fallback={null}>
        <Story />
        <Events />
        <Venue />
        <Rsvp />
        <Footer />
        <MusicPlayer />
      </Suspense>
    </main>
  );
}
