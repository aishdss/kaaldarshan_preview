import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { monuments } from "@/data/monuments";
import { Camera, CameraOff, ScanLine, Sparkles, ArrowRight, Crosshair } from "lucide-react";

export const Route = createFileRoute("/scan")({
  component: Scan,
  head: () => ({
    meta: [
      { title: "Point & Identify | KaalDarshan" },
      {
        name: "description",
        content:
          "Point your camera at a monument and KaalDarshan identifies it, then replays the history that happened on that spot.",
      },
      { property: "og:title", content: "Point & Identify | KaalDarshan" },
      {
        property: "og:description",
        content: "Live camera identification of monuments with instant historical context.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Phase = "idle" | "scanning" | "found";

const steps = [
  "Stabilising frame…",
  "Extracting stone geometry…",
  "Matching against heritage index…",
  "Loading era models…",
  "Rendering timeline…",
];

function Scan() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [camera, setCamera] = useState<"off" | "on" | "denied">("off");
  const [target, setTarget] = useState(monuments[0]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);

  useEffect(() => {
    let stream: MediaStream | null = null;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setCamera("on");
      } catch {
        setCamera("denied");
      }
    })();
    return () => stream?.getTracks().forEach((t) => t.stop());
  }, []);

  const runScan = () => {
    setPhase("scanning");
    setStep(0);
    steps.forEach((_, i) => setTimeout(() => setStep(i), i * 620));
    setTimeout(() => setPhase("found"), steps.length * 620 + 400);
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[1.5fr_1fr]">
        <section>
          <div className="surface-panel film-grain relative aspect-3/4 overflow-hidden rounded-lg sm:aspect-video">
            <video
              ref={videoRef}
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: camera === "on" ? 1 : 0 }}
            />
            {camera !== "on" && (
              <img
                src={target.hero}
                alt="Simulated camera feed"
                width={1280}
                height={720}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            <div className="scan-grid absolute inset-0 opacity-40" />
            {phase === "scanning" && (
              <div className="animate-scanline absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
            )}

            {/* viewfinder corners */}
            <div className="pointer-events-none absolute inset-8">
              {[
                "left-0 top-0 border-l-2 border-t-2",
                "right-0 top-0 border-r-2 border-t-2",
                "left-0 bottom-0 border-b-2 border-l-2",
                "right-0 bottom-0 border-b-2 border-r-2",
              ].map((c) => (
                <span key={c} className={`absolute h-10 w-10 border-primary/70 ${c}`} />
              ))}
              <Crosshair className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-primary/50" />
            </div>

            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-sm border border-border bg-background/75 px-2.5 py-1 text-[10px] tracking-royal">
              {camera === "on" ? (
                <>
                  <Camera className="h-3 w-3 text-primary" />
                  <span className="text-primary">Camera live</span>
                </>
              ) : (
                <>
                  <CameraOff className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {camera === "denied" ? "Demo feed" : "Starting camera…"}
                  </span>
                </>
              )}
            </div>

            {phase === "scanning" && (
              <div className="absolute inset-x-0 bottom-0 space-y-2 bg-background/70 px-5 py-4">
                <p className="text-[10px] tracking-royal text-primary">
                  <Sparkles className="mr-1 inline h-3 w-3" /> {steps[step]}
                </p>
                <span className="block h-1 overflow-hidden rounded-full bg-secondary">
                  <span
                    className="block h-full rounded-full bg-primary transition-[width] duration-500"
                    style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                  />
                </span>
              </div>
            )}

            {phase === "found" && (
              <div className="absolute inset-x-0 bottom-0 space-y-3 border-t border-primary/30 bg-background/85 px-5 py-5 backdrop-blur-md">
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <p className="text-[10px] tracking-royal text-primary">Identified</p>
                    <h2 className="font-display text-xl text-foreground">{target.name}</h2>
                    <p className="font-serif text-base text-muted-foreground">
                      {target.location} · {target.built}
                    </p>
                  </div>
                  <p className="font-display text-2xl text-gold-gradient">
                    {target.confidence}%
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {target.focus.map((f) => (
                    <span
                      key={f.label}
                      className="rounded-sm border border-border bg-secondary/50 px-2 py-1 text-[10px] tracking-widest text-muted-foreground"
                    >
                      {f.label}
                    </span>
                  ))}
                </div>
                <Link
                  to="/monument/$id"
                  params={{ id: target.id }}
                  className="animate-gold-pulse inline-flex items-center gap-2 rounded-sm border border-primary/60 bg-primary/15 px-4 py-2.5 text-xs tracking-royal text-primary"
                >
                  Open chronicle & live sim <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={runScan}
            disabled={phase === "scanning"}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-sm border border-primary/60 bg-primary/10 py-4 text-xs tracking-royal text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
          >
            <ScanLine className="h-4 w-4" />
            {phase === "scanning" ? "Reading the stone…" : "Scan what I'm pointing at"}
          </button>
        </section>

        <aside className="space-y-5">
          <div className="surface-panel rounded-lg p-5">
            <p className="text-[10px] tracking-royal text-primary">Demo target</p>
            <p className="mt-2 font-serif text-base text-muted-foreground">
              Recognition runs on dummy data for this preview. Choose what the lens is aimed at.
            </p>
            <div className="mt-4 space-y-2">
              {monuments.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setTarget(m);
                    setPhase("idle");
                  }}
                  className={`flex w-full items-center gap-3 rounded-sm border p-2 text-left transition-colors ${
                    target.id === m.id
                      ? "border-primary/60 bg-primary/10"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <img
                    src={m.hero}
                    alt={m.name}
                    width={1280}
                    height={720}
                    loading="lazy"
                    className="h-12 w-16 rounded-sm object-cover"
                  />
                  <span>
                    <span className="block font-display text-sm text-foreground">{m.name}</span>
                    <span className="block text-[10px] tracking-widest text-muted-foreground">
                      {m.location}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="surface-panel rounded-lg p-5">
            <p className="text-[10px] tracking-royal text-primary">What happens next</p>
            <ol className="mt-4 space-y-4">
              {[
                "The frame is matched against the heritage index.",
                "History, significance and key events load instantly.",
                "A live simulation replays the event on this exact spot.",
                "The era slider rebuilds the site across centuries.",
              ].map((t, i) => (
                <li key={t} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/50 font-display text-[11px] text-primary">
                    {i + 1}
                  </span>
                  <span className="font-serif text-base text-muted-foreground">{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </main>
    </div>
  );
}
