import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { monuments } from "@/data/monuments";
import logo from "@/assets/logo.asset.json";
import heroBg from "@/assets/hero-bg.jpg";
import { ScanLine, Clock, Sparkles, Hammer, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "KaalDarshan — Point Your Camera, Watch History Happen" },
      {
        name: "description",
        content:
          "Point your camera at any monument and KaalDarshan reveals its history, replays the event that made it famous, and rebuilds it across centuries.",
      },
      { property: "og:title", content: "KaalDarshan — Past Connects. History Lives." },
      {
        property: "og:description",
        content:
          "AI monument recognition, live historical simulations and an era slider that rebuilds ruins across time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const features = [
  {
    Icon: ScanLine,
    title: "Point & recognise",
    text: "Aim the lens at a monument, sculpture, throne or hall. The stone is matched against the heritage index in seconds.",
  },
  {
    Icon: Sparkles,
    title: "Live event simulation",
    text: "The moment that made the place matter is replayed in the frame — the massacre, the court, the siege, as if it were happening now.",
  },
  {
    Icon: Clock,
    title: "Slide through centuries",
    text: "1500, 1800, 1919, today. Drag the year and the site rebuilds itself around you, with a then/now reveal.",
  },
  {
    Icon: Hammer,
    title: "Ruins restored",
    text: "For weathered or collapsed sites, AI reconstructs the original form from survey data and archival record.",
  },
];

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <img
          src={heroBg}
          alt=""
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="scan-grid absolute inset-0 opacity-25" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />

        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-20 text-center">
          <img
            src={logo.url}
            alt="KaalDarshan"
            width={220}
            height={220}
            className="animate-float-slow mx-auto h-40 w-40 rounded-full object-cover sm:h-52 sm:w-52"
            style={{ boxShadow: "var(--shadow-gold)" }}
          />
          <p className="mt-8 text-[10px] tracking-royal text-primary">
            Past connects · History lives
          </p>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight text-gold-gradient sm:text-6xl">
            Point your camera. Watch history happen again.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-serif text-lg text-muted-foreground sm:text-xl">
            KaalDarshan reads the monument in front of you, tells you why it matters, and
            replays the event that happened on that exact ground — then lets you slide back
            through the centuries to see it whole again.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/scan"
              className="animate-gold-pulse inline-flex items-center gap-2 rounded-sm border border-primary/60 bg-primary/15 px-7 py-3.5 text-xs tracking-royal text-primary transition-colors hover:bg-primary/25"
            >
              <ScanLine className="h-4 w-4" /> Open the lens
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-7 py-3.5 text-xs tracking-royal text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              Browse archive <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="surface-panel rounded-lg p-6">
              <f.Icon className="h-6 w-6 text-primary" />
              <h2 className="mt-4 font-display text-lg text-foreground">{f.title}</h2>
              <p className="mt-2 font-serif text-lg leading-relaxed text-muted-foreground">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-royal text-primary">Featured chronicles</p>
            <h2 className="mt-3 font-display text-3xl text-gold-gradient">
              Three places, five centuries
            </h2>
          </div>
          <Link
            to="/explore"
            className="hidden text-[10px] tracking-royal text-muted-foreground hover:text-primary sm:block"
          >
            View all
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
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
                <div
                  className="absolute inset-0"
                  style={{ background: "var(--gradient-veil)" }}
                />
                <span className="absolute bottom-3 left-4 font-display text-lg text-foreground">
                  {m.name}
                </span>
              </div>
              <p className="p-5 font-serif text-base text-muted-foreground">{m.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5">
          <div className="gold-hairline h-px w-40 opacity-60" />
          <p className="font-display text-xs tracking-royal text-gold-gradient">KaalDarshan</p>
          <p className="text-[10px] tracking-widest text-muted-foreground">
            Demo build · reconstructions are AI-generated dramatisations
          </p>
        </div>
      </footer>
    </div>
  );
}
