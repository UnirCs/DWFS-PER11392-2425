const ImageHandler = require('./ImageHandler.js');

let path = 'input/tucan.jpg';
let handler = new ImageHandler(path);

function validatePixels(pixels) {
  return Array.isArray(pixels) && pixels.length > 0;
}

function transformAndSave(name, transformFn) {
  const pixels = handler.getPixels();
  if (!validatePixels(pixels)) return;

  const newPixels = pixels.map((row, i) =>
    row.map((pixel, j) =>
      Array.isArray(pixel) && pixel.length >= 3
        ? transformFn(pixel)
        : (console.error(`Pixel inválido en [${i}][${j}]`, pixel), pixel)
    )
  );

  handler.savePixels(newPixels, `output/tucan_${name}.jpg`);
}

function redConverter() {
  transformAndSave('red', ([r]) => [r, 0, 0]);
}

function greenConverter() {
  transformAndSave('green', ([, g]) => [0, g, 0]);
}

function blueConverter() {
  transformAndSave('blue', ([, , b]) => [0, 0, b]);
}

function greyConverter() {
  transformAndSave('grey', ([r, g, b]) => {
    const avg = Math.round((r + g + b) / 3);
    return [avg, avg, avg];
  });
}

function blackAndWhiteConverter() {
  transformAndSave('black_and_white', ([r, g, b]) => {
    const avg = Math.round((r + g + b) / 3);
    return avg < 128 ? [0, 0, 0] : [255, 255, 255];
  });
}

function dimedConverter() {
  transformAndSave('dimed', ([r, g, b]) =>
    [r, g, b].map((v) => Math.max(0, Math.min(255, Math.floor(v / 2))))
  );
}

function inverseConverter() {
  transformAndSave('inverse', ([r, g, b]) =>
    [r, g, b].map((v) => 255 - v)
  );
}

function scaleDown() {
  const pixels = handler.getPixels();
  if (!validatePixels(pixels)) return;

  const newPixels = [];
  for (let i = 0; i < pixels.length; i += 2) {
    const row = [];
    for (let j = 0; j < pixels[i].length; j += 2) {
      row.push(pixels[i][j]);
    }
    newPixels.push(row);
  }

  const [rows, cols] = handler.getShape();
  handler.savePixels(newPixels, 'output/tucan_scale_down.jpg', rows / 2, cols / 2);
}

function merge(alphaFirst, alphaSecond) {
  let catHandler = new ImageHandler('input/cat.jpg');
  let dogHandler = new ImageHandler('input/dog.jpg');
  let catPixels = catHandler.getPixels();
  let dogPixels = dogHandler.getPixels();

  if (!validatePixels(catPixels) || !validatePixels(dogPixels)) return;
  if (catPixels.length !== dogPixels.length || catPixels[0].length !== dogPixels[0].length) {
    console.error("Imágenes con tamaño diferente");
    return;
  }

  const mergedPixels = catPixels.map((row, i) =>
    row.map((pixel, j) =>
      Array(3).fill(0).map((_, k) =>
        Math.min(255, pixel[k] * alphaFirst + dogPixels[i][j][k] * alphaSecond)
      )
    )
  );

  dogHandler.savePixels(mergedPixels, 'output/merged.jpg');
}

function ejemplo() {
  const filas = 2, columnas = 2;
  const pixeles = Array.from({ length: filas }, (_, i) =>
    Array.from({ length: columnas }, (_, j) =>
      (i + j) % 2 === 0 ? [255, 255, 255] : [0, 0, 0]
    )
  );

  handler.savePixels(pixeles, 'output/ejemplo.jpg', filas, columnas);
}

// Ejecutar una función según la opción
const optionN = 9;

switch (optionN) {
  case 1: redConverter(); break;
  case 2: greenConverter(); break;
  case 3: blueConverter(); break;
  case 4: greyConverter(); break;
  case 5: blackAndWhiteConverter(); break;
  case 6: dimedConverter(); break;
  case 7: inverseConverter(); break;
  case 8: scaleDown(); break;
  case 9: merge(0.3, 0.7); break;
  default: ejemplo(); break;
}