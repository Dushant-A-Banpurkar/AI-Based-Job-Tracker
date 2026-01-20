import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function extractTextFromArrayBuffer(arrayBuffer) {
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const doc = await loadingTask.promise;
  const maxPages = doc.numPages;
  let fullText = "";

  for (let i = 1; i <= maxPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((i) => i.str).join(" ");
    fullText += `\n\n--- PAGE ${i} ---\n` + pageText;
  }
  return fullText;
}


