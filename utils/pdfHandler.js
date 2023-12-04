export const getPdfDocument = async (pdfFile) => {
  const { getDocument, GlobalWorkerOptions } = await import(
    "pdfjs-dist/build/pdf.min.mjs"
  );
  GlobalWorkerOptions.workerSrc = await import(
    "pdfjs-dist/build/pdf.worker.min.mjs"
  );

  try {
    new URL(pdfFile);
    return await getDocument({ url: pdfFile, verbosity: 0 }).promise;
  } catch (error) {
    return await getDocument({ data: pdfFile, verbosity: 0 }).promise;
  }
};

export const getPdfPage = async (pdfDocument, pageNo = 1) => {
  const page = await pdfDocument.getPage(pageNo);
  const viewport = page.getViewport({ scale: 2 });

  let canvas;
  if (typeof window === "undefined") {
    const { createCanvas, DOMMatrix } = await import("canvas");
    global.DOMMatrix = DOMMatrix;
    canvas = createCanvas(viewport.width, viewport.height);
  } else {
    canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
  }

  const canvasContext = canvas.getContext("2d", {
    alpha: false,
    willReadFrequently: true,
  });
  const renderContext = { canvasContext, viewport };
  await page.render(renderContext).promise;
  return canvas;
};
