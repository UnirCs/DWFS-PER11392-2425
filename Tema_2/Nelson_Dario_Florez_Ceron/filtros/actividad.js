const ImageHandler = require('./ImageHandler.js')

let path = 'input/tucan.jpg';
let handler = new ImageHandler(path);

function transformImagePixels(handler, outputPath, transformFn) {
  let pixels = handler.getPixels();

  if (!Array.isArray(pixels) || pixels.length === 0) {
    console.error("Error: pixels no es una matriz válida");
    return;
  }

  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      let pixel = pixels[i][j];

      if (!Array.isArray(pixel) || pixel.length < 3) {
        console.error(`Error: Formato inesperado en pixels[${i}][${j}]`, pixel);
        continue;
      }

      pixels[i][j] = transformFn(pixel, i, j);
    }
  }

  handler.savePixels(pixels, outputPath);
}

function ejemplo() {
  let outputPath = 'output/ejemplo.jpg';
  let pixeles = [];
  let filas = 2;
  let columnas = 2;
  for (let i = 0; i < filas; i++) {
    let nuevaFila = [];
    for (let j = 0; j < columnas; j++) {
      let pixel = [0, 0, 0];
      if ((i + j) % 2 === 0) {
        pixel = [255, 255, 255];
      }
      nuevaFila.push(pixel);
    }
    pixeles.push(nuevaFila);
  }
  handler.savePixels(pixeles, outputPath, filas, columnas);
}

function redConverter() {
  transformImagePixels(handler, 'output/tucan_red.jpg', (pixel) => [pixel[0], 0, 0]);
}

function greenConverter() {
  transformImagePixels(handler, 'output/tucan_green.jpg', (pixel) => [0, pixel[1], 0]);
}

function blueConverter() {
  transformImagePixels(handler, 'output/tucan_blue.jpg', (pixel) => [0, 0, pixel[2]]);
}

function greyConverter() {
  transformImagePixels(handler, 'output/tucan_grey.jpg', (pixel) => {
    let avg = Math.round((pixel[0] + pixel[1] + pixel[2]) / 3);
    return [avg, avg, avg];
  });
}

function blackAndWhiteConverter() {
  transformImagePixels(handler, 'output/tucan_black_and_white.jpg', (pixel) => {
    let avg = Math.round((pixel[0] + pixel[1] + pixel[2]) / 3);
    return avg < 128 ? [0, 0, 0] : [255, 255, 255];
  });
}

function dimBrightness(dimFactor) {
  transformImagePixels(handler, 'output/tucan_dimed.jpg', (pixel) =>
    pixel.map((value) => Math.max(0, Math.min(255, Math.floor(value / dimFactor))))
  );
}

function invertColors() {
  transformImagePixels(handler, 'output/tucan_inverse.jpg', (pixel) =>
    pixel.map((value) => 255 - value)
  );
}

function scaleDown() {
  let outputPath = 'output/tucan_scale_down.jpg';
  let pixels = handler.getPixels();

  if (!Array.isArray(pixels) || pixels.length === 0) {
    console.error("Error: pixels no es una matriz válida");
    return;
  }

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

  if (catPixels.length !== dogPixels.length || catPixels[0].length !== dogPixels[0].length) {
    console.error("Error: Las imágenes no tienen el mismo tamaño.");
    return;
  }

  let pixels = [];

  for (let i = 0; i < catPixels.length; i++) {
    let row = [];
    for (let j = 0; j < catPixels[i].length; j++) {
      let catPixel = catPixels[i][j];
      let dogPixel = dogPixels[i][j];

      if (!Array.isArray(catPixel) || catPixel.length < 3 || !Array.isArray(dogPixel) || dogPixel.length < 3) {
        console.error(`Error: Formato inesperado en pixels[${i}][${j}]`, catPixel, dogPixel);
        continue;
      }

      let mergedPixel = [];
      for (let k = 0; k < 3; k++) {
        let mergedValue = (catPixel[k] * alphaFirst) + (dogPixel[k] * alphaSecond);
        mergedPixel.push(Math.min(255, mergedValue));
      }

      row.push(mergedPixel);
    }
    pixels.push(row);
  }

  dogHandler.savePixels(pixels, outputPath);
}

// Cambia este número según la función que deseas probar
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