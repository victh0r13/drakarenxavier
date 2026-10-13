const STATIC_MEDIA = /^\/_next\/static\/media\/(.+?)\.[\w-]+\.(?:jpe?g|png)$/i;
const PUBLIC_IMAGE = /^\/images\/(.+)\.(?:jpe?g|png)$/i;

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const name = src.match(STATIC_MEDIA)?.[1] ?? src.match(PUBLIC_IMAGE)?.[1];
  return name ? `/_img/${name}-${width}.webp` : src;
}
