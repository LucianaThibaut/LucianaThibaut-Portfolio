import fs from 'node:fs';
import path from 'node:path';
import { createCanvas } from '@napi-rs/canvas';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import sharp from 'sharp';

const files = [
  {
    src: 'C:/Users/giuli/.gemini/antigravity/brain/453f1a59-41f7-474a-b4aa-4c08ea2a0801/.user_uploaded/media_1790276568203.pdf',
    key: '01-tornquist',
    title: 'Calle Tornquist',
    calle: 'Tornquist',
    entre: 'Pedro Ferré y Vogel',
  },
  {
    src: 'C:/Users/giuli/.gemini/antigravity/brain/453f1a59-41f7-474a-b4aa-4c08ea2a0801/.user_uploaded/media_1790276579041.pdf',
    key: '02-bartolome-de-las-casas',
    title: 'Calle Bartolomé de las Casas',
    calle: 'Bartolomé de las Casas',
    entre: 'Tomás A. Edison y Tornquist',
  },
  {
    src: 'C:/Users/giuli/.gemini/antigravity/brain/453f1a59-41f7-474a-b4aa-4c08ea2a0801/.user_uploaded/media_1790276579039.pdf',
    key: '03-d-alighieri',
    title: 'Calle D. Alighieri',
    calle: 'D. Alighieri',
    entre: 'B. de las Casas y Fracción',
  }
];

class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    return { canvas, context };
  }

  reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }

  destroy(canvasAndContext) {
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
}

async function renderPdf(file) {
  const data = new Uint8Array(fs.readFileSync(file.src));
  const doc = await pdfjsLib.getDocument({
    data,
    standardFontDataUrl: path.resolve('node_modules/pdfjs-dist/standard_fonts/') + '/',
  }).promise;

  const page = await doc.getPage(1);

  // Render at 2800px width
  const defaultViewport = page.getViewport({ scale: 1.0 });
  const scale = 2800 / defaultViewport.width;
  const viewport = page.getViewport({ scale });

  const canvasFactory = new NodeCanvasFactory();
  const canvasAndContext = canvasFactory.create(viewport.width, viewport.height);

  await page.render({
    canvasContext: canvasAndContext.context,
    viewport,
    canvasFactory,
  }).promise;

  const rawPng = canvasAndContext.canvas.toBuffer('image/png');

  // Trim excess outer white border
  const trimmed = await sharp(rawPng)
    .trim({ threshold: 10 })
    .toBuffer();

  const metadata = await sharp(trimmed).metadata();

  return {
    ...file,
    trimmedBuffer: trimmed,
    width: metadata.width,
    height: metadata.height,
  };
}

async function run() {
  const outDir = path.resolve('public/planos/pavimentos');
  // Clean old files if any
  fs.mkdirSync(outDir, { recursive: true });

  const results = [];

  for (const f of files) {
    console.log(`Processing ${f.key} (${f.calle})...`);
    const res = await renderPdf(f);
    console.log(`Rendered & trimmed ${f.key}: ${res.width}x${res.height}`);

    // High resolution version for full screen zoom viewer (max 2200px width)
    const fullPath = path.join(outDir, `${res.key}-full.webp`);
    await sharp(res.trimmedBuffer)
      .resize({ width: 2200, withoutEnlargement: true })
      .webp({ quality: 90, effort: 6 })
      .toFile(fullPath);

    // Standard version for in-page sheet preview (max 1400px width)
    const stdPath = path.join(outDir, `${res.key}.webp`);
    await sharp(res.trimmedBuffer)
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 85, effort: 5 })
      .toFile(stdPath);

    const fullMeta = await sharp(fullPath).metadata();
    results.push({
      key: res.key,
      title: res.title,
      calle: res.calle,
      entre: res.entre,
      w: fullMeta.width,
      h: fullMeta.height,
      img: `/planos/pavimentos/${res.key}.webp`,
      full: `/planos/pavimentos/${res.key}-full.webp`,
    });
  }

  // Also remove old files from previous run if any
  const oldFiles = ['tornquist.webp', 'tornquist-full.webp', 'bartolome-de-las-casas.webp', 'bartolome-de-las-casas-full.webp', 'd-alighieri.webp', 'd-alighieri-full.webp'];
  for (const old of oldFiles) {
    const p = path.join(outDir, old);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }

  console.log('Result metadata for portfolio.js:');
  console.log(JSON.stringify(results, null, 2));
}

run().catch(console.error);
