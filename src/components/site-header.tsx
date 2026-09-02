import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.asset.json";

const nav = [
  { to: "/", label: "Home" },
  { to: "/scan", label: "Scan" },
  { to: "/explore", label: "Archive" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo.url}
            alt="KaalDarshan logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-sm tracking-royal text-gold-gradient">
              KaalDarshan
            </span>
            <span className="mt-1 text-[10px] tracking-royal text-muted-foreground">
              Past connects
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-sm px-3 py-2 text-xs tracking-royal text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/scan"
            className="ml-2 rounded-sm border border-primary/50 bg-primary/10 px-4 py-2 text-xs tracking-royal text-primary transition-colors hover:bg-primary/20"
          >
            Point camera
          </Link>
        </nav>
      </div>
      <div className="gold-hairline h-px w-full opacity-40" />
    </header>
  );
}
