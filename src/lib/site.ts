export const site = {
  url: "https://drakarenxavier.com",
  name: "Dra. Karen Xavier",
  role: "Cirurgiã-dentista",
  specialty: "Harmonização Facial",
  cro: "CRO-DF 17858",
  title: "Dra. Karen Xavier | Harmonização Facial em Brasília",
  description:
    "Harmonização facial em Brasília com a Dra. Karen Xavier, cirurgiã-dentista (CRO-DF 17858). Atendimento no Le Signature, em Águas Claras.",
  whatsapp: {
    number: "5561999158005",
    display: "(61) 99915-8005",
    message: "Olá, Dra. Karen! Vim pelo site e gostaria de agendar uma avaliação.",
  },
  instagram: {
    handle: "@drakarenxavier",
    url: "https://www.instagram.com/drakarenxavier/",
  },
  education: "Harvard Health · Skin Care & Repair",
} as const;

export const leSignature = {
  name: "Le Signature",
  tagline: "A assinatura da sua melhor versão",
  street: "Ed. Le Quartier, Av. Pau Brasil, Lote 10",
  neighborhood: "Águas Claras",
  region: "DF",
  postalCode: "71926-000",
  whatsapp: {
    number: "5561992135322",
    message: "Olá! Vim pelo site da Dra. Karen e gostaria de saber sobre a locação de consultórios no Le Signature.",
  },
  instagram: {
    handle: "@lesignaturehub",
    url: "https://www.instagram.com/lesignaturehub/",
  },
} as const;

export function whatsappLink(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const bookingLink = whatsappLink(site.whatsapp.number, site.whatsapp.message);
export const hubLink = whatsappLink(leSignature.whatsapp.number, leSignature.whatsapp.message);
export const fullAddress = `${leSignature.street}, ${leSignature.neighborhood}, Brasília - ${leSignature.region}, ${leSignature.postalCode}`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

export const nav = [
  { href: "#resultados", label: "Resultados" },
  { href: "#sobre", label: "Sobre" },
  { href: "#procedimentos", label: "Procedimentos" },
  { href: "#le-signature", label: "Le Signature" },
  { href: "#duvidas", label: "Dúvidas" },
] as const;

export const procedures = [
  { title: "Toxina botulínica", text: "Linhas de expressão, bruxismo e sorriso gengival" },
  { title: "Preenchimento com ácido hialurônico", text: "Lábios, sulcos, mento, malar e mandíbula" },
  { title: "Bioestimuladores de colágeno", text: "Firmeza e qualidade da pele" },
  { title: "Estética regenerativa", text: "PDRN, GHK-Cu, entre outros ativos" },
  { title: "Rinomodelação", text: "Ajustes no contorno do nariz, sem cirurgia" },
  { title: "Microagulhamento e peelings", text: "Textura, manchas e marcas na pele" },
] as const;

export const results = [
  {
    id: "labios-volume",
    procedure: "Preenchimento labial",
    note: "Mais volume e definição, respeitando a proporção do rosto.",
    before: "/images/resultados/labios-volume-antes.png",
    after: "/images/resultados/labios-volume-depois.png",
    width: 540,
    height: 675,
  },
  {
    id: "sorriso-gengival",
    procedure: "Sorriso gengival",
    note: "Toxina botulínica para mostrar menos gengiva ao sorrir.",
    before: "/images/resultados/sorriso-gengival-antes.png",
    after: "/images/resultados/sorriso-gengival-depois.png",
    width: 1080,
    height: 540,
  },
  {
    id: "testa",
    procedure: "Linhas da testa",
    note: "Toxina botulínica para suavizar as linhas de expressão.",
    before: "/images/resultados/testa-antes.png",
    after: "/images/resultados/testa-depois.png",
    width: 535,
    height: 669,
  },
  {
    id: "labios-contorno",
    procedure: "Contorno labial",
    note: "Contorno e hidratação, mantendo o formato dos lábios.",
    before: "/images/resultados/labios-contorno-antes.png",
    after: "/images/resultados/labios-contorno-depois.png",
    width: 1080,
    height: 540,
  },
] as const;

export const faq = [
  {
    q: "O resultado fica artificial?",
    a: "Não precisa ficar. Trabalho com doses e volumes pensados para o seu rosto e acompanho a evolução no retorno.",
  },
  {
    q: "Quando vejo o resultado?",
    a: "Depende do procedimento. O preenchimento aparece na hora, a toxina leva cerca de 15 dias para o efeito completo e os bioestimuladores melhoram a pele aos poucos, ao longo de alguns meses.",
  },
  {
    q: "Quanto tempo dura?",
    a: "Varia conforme o procedimento e o organismo de cada pessoa. Na avaliação eu passo uma estimativa para o seu caso.",
  },
  {
    q: "Onde é o atendimento?",
    a: `No Le Signature: ${fullAddress}.`,
  },
] as const;
