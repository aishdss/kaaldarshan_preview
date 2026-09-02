import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Wand2, Camera, ScrollText } from "lucide-react";
import type { Era } from "@/data/monuments";

const stateMeta = {
  reconstructed: { label: "AI reconstructed", Icon: Wand2 },
  archival: { label: "Archival restoration", Icon: ScrollText },
  present: { label: "Live capture", Icon: Camera },
} as const;

export function EraSlider({ eras }: { eras: Era[] }) {
  const [i, setI] = useState(eras.length - 1);
  const [split, setSplit] = useState(50);
  const era = eras[i];
  const present = eras[eras.length - 1];
  const meta = stateMeta[era.state];

  return (
    <div className="space-y-5">
      <div className="surface-panel film-grain relative overflow-hidden rounded-lg">
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <img
            src={present.image}
            alt={`${present.label} view`}
            width={1280}
            height={720}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
          >
            {eras.map((e, idx) => (
              <img
                key={e.year}
                src={e.image}
                alt={`${e.year} view`}
                width={1280}
                height={720}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                style={{ opacity: idx === i ? 1 : 0 }}
              />
            ))}
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 w-px bg-primary/80"
            style={{ left: `${split}%`, boxShadow: "0 0 18px var(--gold)" }}
          />
          <div
            className="pointer-events-none absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/70 bg-background/80 text-[10px] tracking-widest text-primary"
            style={{ left: `${split}%` }}
          >
            ⇄
          </div>

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-sm border border-primary/40 bg-background/75 px-2.5 py-1 text-[10px] tracking-royal text-primary">
            <meta.Icon className="h-3 w-3" /> {era.year} · {meta.label}
          </div>
          <div className="absolute right-4 top-4 rounded-sm border border-border bg-background/75 px-2.5 py-1 text-[10px] tracking-royal text-muted-foreground">
            {present.year} · today
          </div>
        </div>

        <div className="space-y-1 border-t border-border/70 bg-background/60 px-4 py-3">
          <p className="font-display text-sm text-primary">{era.label}</p>
          <p className="font-serif text-base text-muted-foreground">{era.caption}</p>
        </div>
      </div>

      <div className="surface-panel rounded-lg p-5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] tracking-royal text-muted-foreground">Travel through time</p>
          <p className="font-display text-2xl text-gold-gradient">{era.year}</p>
        </div>

        <Slider
          value={[i]}
          onValueChange={(v) => setI(v[0])}
          min={0}
          max={eras.length - 1}
          step={1}
          className="mt-5"
          aria-label="Select year"
        />

        <div className="mt-3 flex justify-between">
          {eras.map((e, idx) => (
            <button
              key={e.year}
              onClick={() => setI(idx)}
              className={`text-[11px] tracking-widest transition-colors ${
                idx === i ? "text-primary" : "text-muted-foreground hover:text-primary/80"
              }`}
            >
              {e.year}
            </button>
          ))}
        </div>

        <div className="mt-6 border-t border-border/60 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] tracking-royal text-muted-foreground">
              Then / now reveal
            </p>
            <p className="text-[11px] tracking-widest text-primary">{split}%</p>
          </div>
          <Slider
            value={[split]}
            onValueChange={(v) => setSplit(v[0])}
            min={0}
            max={100}
            step={1}
            className="mt-4"
            aria-label="Reveal comparison"
          />
        </div>
      </div>
    </div>
  );
}
