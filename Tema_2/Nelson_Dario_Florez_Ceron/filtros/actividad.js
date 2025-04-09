const ImageHandler = require('./ImageHandler.js')

let path = 'input/tucan.jpg';
let handler = new ImageHandler(path);

function validatePixels(pixels) {
  return Array.isArray(pixels) && pixels.length > 0;
}

function transformPixels(pixels, transformFn) {
  return pixels.map((row, i) =>
    row.map((pixel, j) =>
      Array.isArray(pixel) && pixel.length >= 3
        ? transformFn(pixel, i, j)
        : (console.error(`Pixel inválido en [${i}][${j}]`, pixel), pixel)
    )
  );
}

function transformImagePixels(handler, outputPath, transformFn) {
  let pixels = handler.getPixels();
  if (!validatePixels(pixels)) return;

  let newPixels = transformPixels(pixels, transformFn);
  handler.savePixels(newPixels, outputPath);
}

function ejemplo() {
  let outputPath = 'output/ejemplo.jpg';
  let filas = 2, columnas = 2;
  let pixeles = Array.from({ length: filas }, (_, i) =>
    Array.from({ length: columnas }, (_, j) =>
      (i + j) % 2 === 0 ? [255, 255, 255] : [0, 0, 0]
    )
  );
  handler.savePixels(pixeles, outputPath, filas, columnas);
}

function redConverter() {
  transformImagePixels(handler, 'output/tucan_red.jpg', (p) => [p[0], 0, 0]);
}

function greenConverter() {
  transformImagePixels(handler, 'output/tucan_green.jpg', (p) => [0, p[1], 0]);
}

function blueConverter() {
  transformImagePixels(handler, 'output/tucan_blue.jpg', (p) => [0, 0, p[2]]);
}

function greyConverter() {
  transformImagePixels(handler, 'output/tucan_grey.jpg', (p) => {
    let avg = Math.round((p[0] + p[1] + p[2]) / 3);
    return [avg, avg, avg];
  });
}

function blackAndWhiteConverter() {
  transformImagePixels(handler, 'output/tucan_black_and_white.jpg', (p) => {
    let avg = Math.round((p[0] + p[1] + p[2]) / 3);
    return avg < 128 ? [0, 0, 0] : [255, 255, 255];
  });
}

function dimBrightness(dimFactor) {
  transformImagePixels(handler, 'output/tucan_dimed.jpg', (p) =>
    p.map((v) => Math.max(0, Math.min(255, Math.floor(v / dimFactor))))
  );
}

function invertColors() {
  transformImagePixels(handler, 'output/tucan_inverse.jpg', (p) =>
    p.map((v) => 255 - v)
  );
}

function scaleDown() {
  let outputPath = 'output/tucan_scale_down.jpg';
  let pixels = handler.getPixels();
  if (!validatePixels(pixels)) return;

  let newPixels = [];
  for (let i = 0; i < pixels.length; i += 2) {
    let newRow = [];
    for (let j = 0; j < pixels[i].length; j += 2) {
      newRow.push(pixels[i][j]);
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, handler.getShape()[0] / 2, handler.getShape()[1] / 2);
}

function merge(alphaFirst, alphaSecond) {
  let catHandler = new ImageHandler('input/cat.jpg');
  let dogHandler = new ImageHandler('input/dog.jpg');
  let outputPath = 'output/merged.jpg';

  let catPixels = catHandler.getPixels();
  let dogPixels = dogHandler.getPixels();

  if (!validatePixels(catPixels) || !validatePixels(dogPixels)) return;
  if (catPixels.length !== dogPixels.length || catPixels[0].length !== dogPixels[0].length) {
    console.error("Imágenes con tamaño diferente");
    return;
  }

  let mergedPixels = catPixels.map((row, i) =>
    row.map((catPixel, j) => {
      let dogPixel = dogPixels[i][j];
      return Array(3).fill(0).map((_, k) =>
        Math.min(255, catPixel[k] * alphaFirst + dogPixel[k] * alphaSecond)
      );
    })
  );

  dogHandler.savePixels(mergedPixels, outputPath);
}

// Selección
let optionN = 9;

switch (optionN) {
  case 1: redConverter(); break;
  case 2: greenConverter(); break;
  case 3: blueConverter(); break;
  case 4: greyConverter(); break;
  case 5: blackAndWhiteConverter(); break;
  case 6: scaleDown(); break;
  case 7: dimBrightness(2); break;
  case 8: invertColors(); break;
  case 9: merge(0.3, 0.7); break;
  default: ejemplo();
}