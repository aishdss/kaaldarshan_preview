import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { EraSlider } from "@/components/era-slider";
import { SimulationPlayer } from "@/components/simulation-player";
import { getMonument, monuments } from "@/data/monuments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Landmark, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/monument/$id")({
  component: MonumentPage,
  loader: ({ params }) => {
    const monument = getMonument(params.id);
    if (!monument) throw notFound();
    return { monument };
  },
  head: ({ params }) => {
    const m = getMonument(params.id);
    const title = m ? `${m.name} — Chronicle | KaalDarshan` : "Chronicle | KaalDarshan";
    const description = m
      ? `${m.tagline}. History, significance, era slider and a live AI simulation of what happened at ${m.name}.`
      : "Monument chronicle on KaalDarshan.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});

function MonumentPage() {
  const { monument } = Route.useLoaderData();
  const others = monuments.filter((m) => m.id !== monument.id);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="relative">
        <img
          src={monument.hero}
          alt={monument.name}
          width={1280}
          height={720}
          className="h-[46vh] w-full object-cover sm:h-[56vh]"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-6xl px-5 pb-8">
            <Link
              to="/scan"
              className="inline-flex items-center gap-2 text-[10px] tracking-royal text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-3 w-3" /> Back to lens
            </Link>
            <p className="mt-4 flex items-center gap-2 text-[10px] tracking-royal text-primary">
              <MapPin className="h-3 w-3" /> {monument.location} · {monument.built}
            </p>
            <h1 className="mt-2 font-display text-4xl text-gold-gradient sm:text-5xl">
              {monument.name}
            </h1>
            <p className="mt-2 font-serif text-lg text-muted-foreground sm:text-xl">
              {monument.tagline}
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-3 sm:grid-cols-4">
          {monument.facts.map((f) => (
            <div key={f.label} className="surface-panel rounded-lg p-4">
              <p className="text-[10px] tracking-royal text-muted-foreground">{f.label}</p>
              <p className="mt-2 font-display text-xl text-primary">{f.value}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="simulation" className="mt-10">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
            {[
              { v: "simulation", l: "Live simulation" },
              { v: "time", l: "Time machine" },
              { v: "history", l: "History" },
              { v: "significance", l: "Significance" },
            ].map((t) => (
              <TabsTrigger
                key={t.v}
                value={t.v}
                className="rounded-sm border border-border bg-transparent px-4 py-2.5 text-[10px] tracking-royal text-muted-foreground data-[state=active]:border-primary/60 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                {t.l}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="simulation" className="mt-6">
            <SimulationPlayer
              scenes={monument.simulation.scenes}
              title={monument.simulation.title}
              subtitle={monument.simulation.subtitle}
            />
          </TabsContent>

          <TabsContent value="time" className="mt-6">
            <EraSlider eras={monument.eras} />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div className="surface-panel rounded-lg p-6">
                <h2 className="font-display text-xl text-primary">The account</h2>
                <p className="mt-4 font-serif text-lg leading-relaxed text-muted-foreground">
                  {monument.summary}
                </p>
              </div>
              <div className="surface-panel rounded-lg p-6">
                <h2 className="font-display text-xl text-primary">Timeline</h2>
                <ol className="mt-5 space-y-5 border-l border-border pl-5">
                  {monument.timeline.map((t) => (
                    <li key={t.year} className="relative">
                      <span className="absolute -left-[27px] top-2 h-2 w-2 rounded-full bg-primary" />
                      <p className="font-display text-sm text-primary">{t.year}</p>
                      <p className="mt-1 font-serif text-base text-muted-foreground">{t.event}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="significance" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {monument.significance.map((s, i) => (
                <div key={s} className="surface-panel rounded-lg p-6">
                  <p className="font-display text-sm text-primary">0{i + 1}</p>
                  <p className="mt-3 font-serif text-lg leading-relaxed text-muted-foreground">
                    {s}
                  </p>
                </div>
              ))}
              <div className="surface-panel rounded-lg p-6 md:col-span-2">
                <p className="text-[10px] tracking-royal text-primary">Detected in frame</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {monument.focus.map((f) => (
                    <div key={f.label} className="border-l border-primary/40 pl-4">
                      <p className="flex items-center gap-2 font-display text-sm text-foreground">
                        <Landmark className="h-3.5 w-3.5 text-primary" /> {f.label}
                      </p>
                      <p className="mt-1 font-serif text-base text-muted-foreground">{f.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <section className="mt-14">
          <p className="text-[10px] tracking-royal text-primary">Continue the journey</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {others.map((m) => (
              <Link
                key={m.id}
                to="/monument/$id"
                params={{ id: m.id }}
                className="surface-panel group flex items-center gap-4 overflow-hidden rounded-lg p-3"
              >
                <img
                  src={m.hero}
                  alt={m.name}
                  width={1280}
                  height={720}
                  loading="lazy"
                  className="h-20 w-28 rounded-sm object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span>
                  <span className="block font-display text-base text-foreground">{m.name}</span>
                  <span className="block font-serif text-base text-muted-foreground">
                    {m.tagline}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
