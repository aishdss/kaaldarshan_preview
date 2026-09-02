import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { monuments } from "@/data/monuments";
import { MapPin, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/explore")({
  component: Explore,
  head: () => ({
    meta: [
      { title: "Archive of Monuments | KaalDarshan" },
      {
        name: "description",
        content:
          "Browse the KaalDarshan archive of monuments with AI reconstructions, era sliders and live historical simulations.",
      },
      { property: "og:title", content: "Archive of Monuments | KaalDarshan" },
      {
        property: "og:description",
        content: "Monuments with AI reconstructions, era sliders and live event simulations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Explore() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-[10px] tracking-royal text-primary">The archive</p>
        <h1 className="mt-3 font-display text-4xl text-gold-gradient">Chronicled sites</h1>
        <p className="mt-3 max-w-2xl font-serif text-lg text-muted-foreground">
          Every site below is fully reconstructed in the demo — open one to move through its
          eras and watch the event that made it matter.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {monuments.map((m) => (
            <Link
              key={m.id}
              to="/monument/$id"
              params={{ id: m.id }}
              className="surface-panel group overflow-hidden rounded-lg transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={m.hero}
                  alt={m.name}
                  width={1280}
                  height={720}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
              </div>
              <div className="space-y-2 p-5">
                <p className="flex items-center gap-1.5 text-[10px] tracking-royal text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {m.location}
                </p>
                <h2 className="font-display text-lg text-foreground">{m.name}</h2>
                <p className="font-serif text-base text-muted-foreground">{m.tagline}</p>
                <p className="flex items-center gap-2 pt-1 text-[10px] tracking-royal text-primary">
                  Open chronicle <ArrowRight className="h-3 w-3" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
