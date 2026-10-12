"use client";

import Image from "next/image";
import { type PointerEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { ArrowIcon, DragIcon } from "@/components/icons";

type Case = {
  id: string;
  procedure: string;
  note: string;
  before: string;
  after: string;
  width: number;
  height: number;
};

const DESKTOP_MAX_H = 600;
const DESKTOP_COLUMN = 685;
const PEEK_MS = 2000;

function imageSizes(c: Case) {
  const desktop = Math.round(Math.min(DESKTOP_COLUMN, DESKTOP_MAX_H * (c.width / c.height)));
  return `(min-width: 1152px) ${desktop}px, (min-width: 1024px) 60vw, 100vw`;
}

function Comparison({ c, hint, onInteract }: { c: Case; hint: boolean; onInteract: () => void }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; moving: boolean } | null>(null);
  const touched = useRef(false);
  const sizes = imageSizes(c);

  useEffect(() => {
    const el = box.current;
    if (!hint || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = window.setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            if (touched.current) return;
            const t = Math.min((now - start) / PEEK_MS, 1);
            const eased = (1 - Math.cos(Math.PI * t)) / 2;
            setPos(50 - 20 * Math.sin(2 * Math.PI * eased));
            if (t < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        }, 600);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [hint]);

  const moveTo = (clientX: number) => {
    const rect = box.current?.getBoundingClientRect();
    if (!rect) return;
    touched.current = true;
    onInteract();
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const mouse = e.pointerType === "mouse";
    drag.current = { x: e.clientX, y: e.clientY, moving: mouse };
    if (mouse) moveTo(e.clientX);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    if (!d.moving) {
      const dx = Math.abs(e.clientX - d.x);
      if (dx < 6 || dx < Math.abs(e.clientY - d.y)) return;
      d.moving = true;
    }
    moveTo(e.clientX);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (drag.current && !drag.current.moving) moveTo(e.clientX);
    drag.current = null;
  };

  return (
    <div
      ref={box}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (drag.current = null)}
      className="group relative mx-auto cursor-ew-resize touch-pan-y touch-pinch-zoom select-none overflow-hidden rounded-[3px] bg-sand [--max-h:66svh] [-webkit-touch-callout:none] lg:[--max-h:min(600px,72vh)]"
      style={{
        aspectRatio: `${c.width} / ${c.height}`,
        width: `min(100%, calc(var(--max-h) * ${c.width / c.height}))`,
      }}
    >
      <Image
        src={c.after}
        alt={`${c.procedure}, depois`}
        fill
        quality={90}
        sizes={sizes}
        draggable={false}
        className="object-cover"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={c.before}
          alt={`${c.procedure}, antes`}
          fill
          quality={90}
          sizes={sizes}
          draggable={false}
          className="object-cover"
        />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-[3px] bg-ivory/90 px-2.5 py-1 text-xs text-ink">
        Antes
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-[3px] bg-ink/80 px-2.5 py-1 text-xs text-ivory">
        Depois
      </span>

      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => {
          touched.current = true;
          onInteract();
          setPos(Number(e.target.value));
        }}
        aria-label={`Comparar antes e depois: ${c.procedure}`}
        className="sr-only"
      />

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-ivory shadow-[0_0_6px_rgba(31,26,23,0.35)]" />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
          {hint && (
            <span className="absolute inset-0 rounded-full border-2 border-ivory motion-safe:animate-nudge" />
          )}
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-ivory text-ink shadow-[0_4px_14px_rgba(31,26,23,0.3)] ring-gold ring-offset-2 group-has-[input:focus-visible]:ring-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
          <span
            className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/80 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ivory transition-opacity duration-500 ${
              hint ? "opacity-100" : "opacity-0"
            }`}
          >
            Arraste
          </span>
        </div>
      </div>
    </div>
  );
}

export function BeforeAfter({ cases, children }: { cases: readonly Case[]; children?: ReactNode }) {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const current = cases[active];
  const count = cases.length;
  const step = (delta: number) => setActive((i) => (i + delta + count) % count);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-14">
      <div className="contents lg:block">
        <div className="order-1">{children}</div>

        <div className="order-2 flex items-center justify-between gap-4 lg:hidden">
          <button
            type="button"
            aria-label="Caso anterior"
            onClick={() => step(-1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-linen text-ink transition-colors active:bg-sand"
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
          </button>
          <div className="text-center" aria-live="polite">
            <p className="font-serif text-2xl leading-tight text-ink">{current.procedure}</p>
            <p className="mt-1 text-xs text-mute">
              {active + 1} de {count}
            </p>
          </div>
          <button
            type="button"
            aria-label="Próximo caso"
            onClick={() => step(1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-linen text-ink transition-colors active:bg-sand"
          >
            <ArrowIcon className="h-4 w-4" />
          </button>
        </div>

        <div role="tablist" aria-label="Casos" className="mt-10 hidden flex-col lg:flex">
          {cases.map((c, i) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`w-full border-b border-linen py-4 text-left transition-colors ${
                i === active ? "text-ink" : "text-mute hover:text-taupe"
              }`}
            >
              <span className="block font-serif text-2xl">{c.procedure}</span>
              <span
                className={`mt-1 block text-sm leading-relaxed text-taupe transition-all duration-500 ${
                  i === active ? "max-h-20 opacity-100" : "max-h-0 overflow-hidden opacity-0"
                }`}
              >
                {c.note}
              </span>
            </button>
          ))}
        </div>
      </div>

      <figure className="order-3 lg:flex lg:min-h-[calc(min(600px,72vh)+3.75rem)] lg:flex-col lg:justify-center">
        <Comparison key={current.id} c={current} hint={!interacted} onInteract={() => setInteracted(true)} />
        <figcaption className="mt-5 text-center">
          <p className="mb-3 text-sm leading-relaxed text-taupe lg:hidden">{current.note}</p>
          <p className="flex items-center justify-center gap-2 text-sm font-medium text-ink">
            <DragIcon className="h-4 w-4 text-gold" />
            Arraste para comparar o antes e depois
          </p>
          <p className="mt-1 text-xs text-mute">Os resultados variam de pessoa para pessoa.</p>
        </figcaption>
      </figure>
    </div>
  );
}
