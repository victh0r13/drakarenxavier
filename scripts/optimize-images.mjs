import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE = path.resolve("public/images");
const OUTPUT = path.resolve("public/_img");
const WIDTHS = [256, 384, 640, 828, 1080, 1600];

async function listImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return listImages(full);
      return /\.(jpe?g|png)$/i.test(entry.name) ? [full] : [];
    }),
  );
  return files.flat();
}

async function isFresh(source, target) {
  try {
    const [a, b] = await Promise.all([stat(source), stat(target)]);
    return b.mtimeMs >= a.mtimeMs;
  } catch {
    return false;
  }
}

const images = await listImages(SOURCE);
let written = 0;

for (const file of images) {
  const relative = path.relative(SOURCE, file).replace(/\.(jpe?g|png)$/i, "");
  const quality = relative.startsWith("resultados") ? 90 : 82;
  const { width: original } = await sharp(file).metadata();

  for (const width of WIDTHS) {
    const target = path.join(OUTPUT, `${relative}-${width}.webp`);
    if (await isFresh(file, target)) continue;
    await mkdir(path.dirname(target), { recursive: true });
    await sharp(file)
      .resize({ width: Math.min(width, original), withoutEnlargement: true })
      .webp({ quality, alphaQuality: 90 })
      .toFile(target);
    written++;
  }
}

console.log(`Imagens: ${images.length} originais, ${written} arquivos gerados.`);
