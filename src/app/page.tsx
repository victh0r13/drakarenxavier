import Image, { type StaticImageData } from "next/image";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Header } from "@/components/Header";
import { ArrowIcon, InstagramIcon, MapPinIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
import { RevealObserver } from "@/components/RevealObserver";
import { bookingLink, faq, fullAddress, hubLink, leSignature, mapsLink, procedures, results, site } from "@/lib/site";
import karenRetrato from "../../public/images/karen-retrato.jpg";
import karenXavier from "../../public/images/karen-xavier.png";
import consultorio from "../../public/images/le-signature-consultorio.jpg";
import recepcao from "../../public/images/le-signature-recepcao.jpg";

export default function Home() {
  return (
    <>
      <Header />
      <RevealObserver />
      <main>
        <Hero />
        <Results />
        <About />
        <Procedures />
        <LeSignature />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

function BookingButton({ children = "Agendar avaliação" }: { children?: React.ReactNode }) {
  return (
    <a
      href={bookingLink}
      target="_blank"
      rel="noopener"
      className="group inline-flex items-center justify-center gap-2.5 rounded-[3px] bg-ink px-7 py-3.5 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-gold"
    >
      {children}
      <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}

function AddressText({ text }: { text: string }) {
  return text.split(/(\d{5}-\d{3})/).map((part, i) =>
    i % 2 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function ArchFrame({
  src,
  alt,
  sizes,
  className = "",
  imageClassName = "object-cover",
  preload = false,
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  preload?: boolean;
}) {
  return (
    <div className={`rounded-t-full border border-gold-soft/60 p-2 md:p-2.5 ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-t-full bg-gradient-to-b from-sand to-linen">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          quality={90}
          placeholder={src.blurDataURL ? "blur" : "empty"}
          className={imageClassName}
        />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="inicio" className="pt-24 md:pt-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 md:px-10 lg:min-h-[calc(100dvh-7rem)] lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 lg:pb-16">
        <div>
          <p data-reveal className="eyebrow">
            Harmonização facial · Brasília
          </p>
          <h1
            data-reveal
            className="mt-6 font-serif text-[2.5rem] font-light leading-[1.04] text-ink sm:text-6xl xl:text-[4.25rem]"
          >
            Sua individualidade <br />é a minha <em className="font-normal text-gold">assinatura.</em>
          </h1>
          <p data-reveal className="mt-7 max-w-md text-base leading-relaxed text-taupe md:text-lg">
            Harmonização facial planejada a partir do seu rosto, com resultado natural e acompanhamento de perto.
          </p>
          <div data-reveal className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <BookingButton />
            <a href="#resultados" className="text-sm text-ink underline decoration-linen underline-offset-8 hover:decoration-ink">
              Ver antes e depois
            </a>
          </div>
        </div>

        <figure data-reveal className="relative mx-auto w-[82%] max-w-[26rem] lg:w-full">
          <ArchFrame
            src={karenRetrato}
            alt="Dra. Karen Xavier"
            preload
            sizes="(min-width: 1024px) 420px, 82vw"
            className="aspect-[4/5]"
          />
          <figcaption className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[3px] border border-linen bg-ivory/95 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(42,36,32,0.35)] backdrop-blur md:-bottom-6 md:-left-8 md:translate-x-0 md:px-5 md:py-4">
            <p className="font-serif text-xl leading-none text-ink md:text-2xl">{site.name}</p>
            <p className="mt-2 text-[0.6rem] uppercase tracking-[0.18em] text-taupe md:text-[0.62rem] md:tracking-[0.24em]">
              {site.role} · {site.cro}
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section id="resultados" className="bg-ivory px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div data-reveal>
          <BeforeAfter cases={results}>
            <h2 className="font-serif text-4xl font-light text-ink md:text-5xl">Antes e depois</h2>
            <p className="mt-4 max-w-md leading-relaxed text-taupe">
              Alguns casos atendidos no consultório, publicados com autorização de cada paciente.
            </p>
          </BeforeAfter>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.8fr_1fr] md:gap-16 lg:gap-24">
        <div data-reveal className="mx-auto w-[78%] max-w-sm md:w-full">
          <ArchFrame
            src={karenXavier}
            alt="Dra. Karen Xavier"
            sizes="(min-width: 768px) 380px, 78vw"
            className="aspect-[4/5]"
            imageClassName="origin-top scale-[1.08] object-cover object-top"
          />
        </div>

        <div data-reveal>
          <h2 className="font-serif text-4xl font-light text-ink md:text-5xl">Prazer, sou a Karen.</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-taupe">
            <p>
              Sou cirurgiã-dentista e me especializei em harmonização facial. Gosto de resultados discretos: você se olha
              no espelho e continua se reconhecendo, só que com o rosto mais descansado.
            </p>
            <p>
              Antes de qualquer procedimento faço uma avaliação completa, olhando proporções, estrutura óssea e
              musculatura. A partir dela, monto com você um plano que faça sentido para o seu rosto e para a sua rotina.
            </p>
          </div>
          <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-linen pt-6 text-sm">
            <div>
              <dt className="text-mute">Registro</dt>
              <dd className="mt-1 text-ink">{site.cro}</dd>
            </div>
            <div>
              <dt className="text-mute">Formação complementar</dt>
              <dd className="mt-1 text-ink">{site.education}</dd>
            </div>
            <div>
              <dt className="text-mute">Atendimento</dt>
              <dd className="mt-1 text-ink">
                {leSignature.name}, {leSignature.neighborhood}
              </dd>
            </div>
            <div>
              <dt className="text-mute">Instagram</dt>
              <dd className="mt-1">
                <a href={site.instagram.url} target="_blank" rel="noopener" className="text-ink underline-offset-4 hover:underline">
                  {site.instagram.handle}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Procedures() {
  return (
    <section id="procedimentos" className="bg-sand/45 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-24">
        <div data-reveal>
          <h2 className="font-serif text-4xl font-light text-ink md:text-5xl">Procedimentos</h2>
          <p className="mt-4 max-w-sm leading-relaxed text-taupe">
            Não sabe o que faria sentido para você? A avaliação serve justamente para isso.
          </p>
          <a
            href={bookingLink}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex items-center gap-2 text-sm text-ink underline decoration-linen underline-offset-8 hover:decoration-ink"
          >
            Agendar avaliação <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
        <ul data-reveal className="border-t border-linen">
          {procedures.map((p) => (
            <li
              key={p.title}
              className="flex flex-col gap-1 border-b border-linen py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <span className="font-serif text-[1.4rem] leading-snug text-ink">{p.title}</span>
              <span className="text-sm text-taupe sm:max-w-[15rem] sm:text-right">{p.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LeSignature() {
  return (
    <section id="le-signature" className="bg-espresso px-5 py-20 text-ivory md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div data-reveal className="grid grid-cols-5 gap-3 md:gap-4">
          <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-t-full">
            <Image
              src={consultorio}
              alt="Consultório do Le Signature"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 320px, 58vw"
              className="object-cover"
            />
          </div>
          <div className="relative col-span-2 mt-16 aspect-[3/4] overflow-hidden rounded-[3px]">
            <Image
              src={recepcao}
              alt="Café servido na recepção do Le Signature"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 210px, 38vw"
              className="object-cover"
            />
          </div>
        </div>

        <div data-reveal>
          <p className="eyebrow">Onde atendo</p>
          <h2 className="mt-5 font-serif text-4xl font-light md:text-5xl">{leSignature.name}</h2>
          <p className="mt-2 font-serif text-xl italic text-gold-soft">{leSignature.tagline}</p>
          <p className="mt-6 max-w-md leading-relaxed text-linen/75">
            Atendo no Le Signature, um espaço de saúde e estética que abri em {leSignature.neighborhood}. Os
            consultórios são reservados e a recepção tem sempre um café esperando por você.
          </p>
          <p className="mt-6 flex max-w-md items-start gap-2.5 text-sm leading-relaxed text-linen/85">
            <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
            <span>
              <AddressText text={fullAddress} />
              <br />
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener"
                className="text-gold-soft underline underline-offset-4 hover:text-ivory"
              >
                Ver no mapa
              </a>
            </span>
          </p>
          <a
            href={leSignature.instagram.url}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex items-center gap-2 text-sm text-ivory/90 hover:text-ivory"
          >
            <InstagramIcon className="h-4 w-4" /> {leSignature.instagram.handle}
          </a>
          <p className="mt-10 max-w-md border-t border-ivory/10 pt-6 text-sm leading-relaxed text-linen/60">
            É profissional da saúde? O Le Signature também aluga consultórios por hora.{" "}
            <a href={hubLink} target="_blank" rel="noopener" className="text-gold-soft underline underline-offset-4 hover:text-ivory">
              Saiba mais
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="duvidas" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-24">
        <h2 data-reveal className="font-serif text-4xl font-light text-ink md:text-5xl">
          Dúvidas frequentes
        </h2>
        <div data-reveal className="border-t border-linen">
          {faq.map((item) => (
            <details key={item.q} className="group border-b border-linen">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 font-serif text-[1.4rem] text-ink">
                {item.q}
                <PlusIcon className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="max-w-xl pb-6 leading-relaxed text-taupe">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="bg-sand px-5 py-20 md:px-10 md:py-24">
      <div data-reveal className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-serif text-4xl font-light text-ink md:text-5xl">Agende sua avaliação</h2>
          <p className="mt-4 max-w-md leading-relaxed text-taupe">
            Atendimento com horário marcado. É só me chamar no WhatsApp.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <BookingButton>Chamar no WhatsApp</BookingButton>
          <span className="text-sm text-taupe">{site.whatsapp.display}</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-espresso px-5 py-12 text-sm text-linen/60 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-serif text-2xl text-ivory">Karen Xavier</p>
            <p className="mt-1">
              {site.role} · {site.cro}
            </p>
            <p className="mt-1">
              {leSignature.name}: <AddressText text={fullAddress} />
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <a href={bookingLink} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-ivory">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>
            <a href={site.instagram.url} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-ivory">
              <InstagramIcon className="h-4 w-4" /> {site.instagram.handle}
            </a>
            <a href={leSignature.instagram.url} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-ivory">
              <InstagramIcon className="h-4 w-4" /> {leSignature.instagram.handle}
            </a>
          </div>
        </div>
        <p className="mt-10 border-t border-ivory/10 pt-6 text-xs leading-relaxed text-linen/40">
          Procedimentos realizados por cirurgiã-dentista habilitada (Lei nº 5.081/66 e Resolução CFO nº 198/2019). As
          informações deste site não substituem uma avaliação presencial. © 2026 {site.name}
        </p>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={bookingLink}
      target="_blank"
      rel="noopener"
      aria-label="Agendar avaliação pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-ivory shadow-lg shadow-ink/20 transition-colors duration-300 hover:bg-gold md:bottom-8 md:right-8"
    >
      <WhatsAppIcon className="h-5 w-5" />
    </a>
  );
}
