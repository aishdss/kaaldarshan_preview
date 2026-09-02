import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Sparkles } from "lucide-react";
import type { Scene } from "@/data/monuments";

const SCENE_MS = 6000;

export function SimulationPlayer({
  scenes,
  title,
  subtitle,
}: {
  scenes: Scene[];
  title: string;
  subtitle: string;
}) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const raf = useRef<number | null>(null);
  const start = useRef<number>(0);

  useEffect(() => {
    if (!playing) return;
    start.current = performance.now() - progress * SCENE_MS;

    const tick = (now: number) => {
      const p = Math.min((now - start.current) / SCENE_MS, 1);
      setProgress(p);
      if (p >= 1) {
        setIndex((i) => (i + 1) % scenes.length);
        setProgress(0);
        start.current = now;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index, scenes.length]);

  const scene = scenes[index]!;

  const goTo = (i: number) => {
    setIndex(i);
    setProgress(0);
  };

  return (
    <div className="surface-panel film-grain relative overflow-hidden rounded-lg">
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {scenes.map((s, i) => (
          <img
            key={`${s.title}-${i}`}
            src={s.image}
            alt={s.title}
            width={1280}
            height={720}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out"
            style={{
              opacity: i === index ? 1 : 0,
              transform: i === index ? `scale(${1.04 + progress * 0.06})` : "scale(1.02)",
            }}
          />
        ))}

        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-veil)" }}
        />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="flex items-center gap-2 rounded-sm border border-destructive/60 bg-background/70 px-2.5 py-1 text-[10px] tracking-royal text-destructive">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
            Live sim
          </span>
          <span className="flex items-center gap-1.5 rounded-sm border border-primary/40 bg-background/70 px-2.5 py-1 text-[10px] tracking-royal text-primary">
            <Sparkles className="h-3 w-3" /> AI reconstruction
          </span>
        </div>

        <div className="absolute right-4 top-4 rounded-sm border border-border bg-background/70 px-2.5 py-1 font-display text-[11px] tracking-widest text-primary">
          {scene.time}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <p className="text-[10px] tracking-royal text-primary/80">{subtitle}</p>
          <h3 className="mt-2 font-display text-xl text-foreground sm:text-2xl">
            {scene.title}
          </h3>
          <p className="mt-2 max-w-2xl font-serif text-base leading-relaxed text-muted-foreground sm:text-lg">
            {scene.narration}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-border/70 bg-background/60 px-4 py-3">
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause simulation" : "Play simulation"}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/50 text-primary transition-colors hover:bg-primary/15"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          onClick={() => goTo(0)}
          aria-label="Restart simulation"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-primary"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        <div className="flex flex-1 flex-wrap gap-2">
          {scenes.map((s, i) => (
            <button
              key={s.title}
              onClick={() => goTo(i)}
              className="group min-w-16 flex-1"
              title={s.title}
            >
              <span className="block h-1 overflow-hidden rounded-full bg-secondary">
                <span
                  className="block h-full rounded-full bg-primary transition-[width] duration-100"
                  style={{
                    width:
                      i < index ? "100%" : i === index ? `${progress * 100}%` : "0%",
                  }}
                />
              </span>
              <span className="mt-1.5 block truncate text-left text-[10px] tracking-widest text-muted-foreground group-hover:text-primary">
                {s.time}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="border-t border-border/60 px-4 py-2 text-[10px] tracking-widest text-muted-foreground">
        {title} · generated scene, dramatised for demonstration
      </p>
    </div>
  );
}
