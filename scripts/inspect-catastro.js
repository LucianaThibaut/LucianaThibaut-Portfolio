import fs from 'node:fs';
import path from 'node:path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfs = [
  'media_1790276709527.pdf',
  'media_1790276714951.pdf',
  'media_1790276728067.pdf',
  'media_1790276779769.pdf',
];

const baseDir = 'C:/Users/giuli/.gemini/antigravity/brain/453f1a59-41f7-474a-b4aa-4c08ea2a0801/.user_uploaded/';

async function inspect() {
  for (const name of pdfs) {
    const filePath = path.join(baseDir, name);
    const data = new Uint8Array(fs.readFileSync(filePath));
    const doc = await pdfjsLib.getDocument({
      data,
      standardFontDataUrl: path.resolve('node_modules/pdfjs-dist/standard_fonts/') + '/',
    }).promise;
    const page = await doc.getPage(1);
    const textContent = await page.getTextContent();
    const text = textContent.items.map(i => i.str).join(' ');
    const vp = page.getViewport({ scale: 1.0 });
    console.log(`=== ${name} ===`);
    console.log(`Size: ${vp.width} x ${vp.height}`);
    console.log(`Text (first 250 chars): ${text.slice(0, 250)}`);
  }
}

inspect().catch(console.error);
