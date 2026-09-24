import fs from 'node:fs';
import path from 'node:path';
import { createCanvas } from '@napi-rs/canvas';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import sharp from 'sharp';

const files = [
  {
    src: 'C:/Users/giuli/.gemini/antigravity/brain/453f1a59-41f7-474a-b4aa-4c08ea2a0801/.user_uploaded/media_1790276779769.pdf',
    key: '01-zona-catastro',
    title: 'Zona catastro',
  },
  {
    src: 'C:/Users/giuli/.gemini/antigravity/brain/453f1a59-41f7-474a-b4aa-4c08ea2a0801/.user_uploaded/media_1790276709527.pdf',
    key: '02-plano-sector-1',
    title: 'Sector 1',
  },
  {
    src: 'C:/Users/giuli/.gemini/antigravity/brain/453f1a59-41f7-474a-b4aa-4c08ea2a0801/.user_uploaded/media_1790276714951.pdf',
    key: '03-catastro-ejemplo',
    title: 'Catastro ejemplo',
  },
  {
    src: 'C:/Users/giuli/.gemini/antigravity/brain/453f1a59-41f7-474a-b4aa-4c08ea2a0801/.user_uploaded/media_1790276728067.pdf',
    key: '04-referencias',
    title: 'Referencias',
  },
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

  // Render at 2800px width (or proportional for vertical layout)
  const defaultViewport = page.getViewport({ scale: 1.0 });
  const isVertical = defaultViewport.height > defaultViewport.width;
  const targetDim = isVertical ? { height: 2800 } : { width: 2800 };
  const scale = isVertical ? 2800 / defaultViewport.height : 2800 / defaultViewport.width;
  const viewport = page.getViewport({ scale });

  const canvasFactory = new NodeCanvasFactory();
  const canvasAndContext = canvasFactory.create(viewport.width, viewport.height);

  await page.render({
    canvasContext: canvasAndContext.context,
    viewport,
    canvasFactory,
  }).promise;

  const rawPng = canvasAndContext.canvas.toBuffer('image/png');

  // Trim excess outer whitespace
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
  const outDir = path.resolve('public/planos/catastro');
  fs.mkdirSync(outDir, { recursive: true });

  const results = [];

  for (const f of files) {
    console.log(`Processing ${f.key} (${f.title})...`);
    const res = await renderPdf(f);
    console.log(`Rendered & trimmed ${f.key}: ${res.width}x${res.height}`);

    const isVertical = res.height > res.width;
    const maxFullWidth = isVertical ? 1800 : 2400;
    const maxStdWidth = isVertical ? 1200 : 1600;

    // High resolution version for zoom viewer
    const fullPath = path.join(outDir, `${res.key}-full.webp`);
    await sharp(res.trimmedBuffer)
      .resize({ width: maxFullWidth, withoutEnlargement: true })
      .webp({ quality: 90, effort: 6 })
      .toFile(fullPath);

    // Standard version for in-page sheet preview
    const stdPath = path.join(outDir, `${res.key}.webp`);
    await sharp(res.trimmedBuffer)
      .resize({ width: maxStdWidth, withoutEnlargement: true })
      .webp({ quality: 85, effort: 5 })
      .toFile(stdPath);

    const fullMeta = await sharp(fullPath).metadata();
    results.push({
      key: res.key,
      title: res.title,
      w: fullMeta.width,
      h: fullMeta.height,
      img: `/planos/catastro/${res.key}.webp`,
      full: `/planos/catastro/${res.key}-full.webp`,
    });
  }

  console.log('Result metadata for portfolio.js:');
  console.log(JSON.stringify(results, null, 2));
}

run().catch(console.error);
