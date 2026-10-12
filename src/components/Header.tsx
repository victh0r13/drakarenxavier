"use client";

import { useEffect, useState } from "react";
import { bookingLink, nav, site } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "border-b border-linen/70 bg-cream/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-10">
        <a href="#inicio" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-serif text-2xl text-ink">Karen Xavier</span>
          <span className="mt-1 text-[0.7rem] tracking-wide text-taupe">{site.specialty}</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-taupe transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={bookingLink}
            target="_blank"
            rel="noopener"
            className="hidden rounded-[3px] bg-ink px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-gold sm:inline-block"
          >
            Agendar
          </a>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className={`absolute h-px w-6 bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
            <span className={`absolute h-px w-6 bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-linen/70 bg-cream px-5 pb-10 pt-4 lg:hidden"
      >
        <nav aria-label="Menu" className="flex flex-col">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-linen/70 py-4 font-serif text-3xl text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={bookingLink}
          target="_blank"
          rel="noopener"
          className="mt-8 block rounded-[3px] bg-ink py-4 text-center text-sm font-medium text-ivory"
        >
          Agendar avaliação
        </a>
      </div>
    </header>
  );
}
