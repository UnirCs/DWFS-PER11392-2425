const ImageHandler = require('./imageHandler');

let filePath = 'input/messi.jpg';
let imageHandler = new ImageHandler(filePath);

/**
 * Image's red filter
 */
function redFilter() {
    let outputPath = 'output/messi_red.jpg';
    let pixels = imageHandler.getPixels();

    // Set the green and blue channels to 0 for each pixel
    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            pixels[i][j][1] = 0; // G
            pixels[i][j][2] = 0; // B
        }
    }
    imageHandler.savePixels(pixels, outputPath);
}

/**
 * Image's green filter
 */
function greenFilter() {
    let outputPath = 'output/messi_green.jpg';
    let pixels = imageHandler.getPixels();

    // Set the red and blue channels to 0 for each pixel
    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            pixels[i][j][0] = 0; // R
            pixels[i][j][2] = 0; // B
        }
    }
    imageHandler.savePixels(pixels, outputPath);
}

/**
 * Image's blue filter
 */
function blueFilter() {
    let outputPath = 'output/messi_blue.jpg';
    let pixels = imageHandler.getPixels();

    // Set the red and green channels to 0 for each pixel
    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            pixels[i][j][0] = 0; // R
            pixels[i][j][1] = 0; // G
        }
    }
    imageHandler.savePixels(pixels, outputPath);
}

/**
 * Image's gray filter
 */
function grayFilter() {
    let outputPath = 'output/messi_gray.jpg';
    let pixels = imageHandler.getPixels();

    // Set the red, green and blue channels to the average value for each pixel
    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            for (let k = 0; k < 3; k++) {
                pixels[i][j][k] = Math.floor((pixels[i][j][0] + pixels[i][j][1] + pixels[i][j][2]) / 3);
            }
        }
    }
    imageHandler.savePixels(pixels, outputPath);
}

/**
 * Image's black and white filter
 */
function blackAndWhiteFilter() {
    let outputPath = 'output/messi_black_and_white.jpg';
    let pixels = imageHandler.getPixels();

    // Set the red, green and blue channels to 0 if the average value is less than 128, otherwise set them to 255
    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            let averageValue = Math.floor((pixels[i][j][0] + pixels[i][j][1] + pixels[i][j][2]) / 3);
            for (let k = 0; k < 3; k++) {
                if (averageValue < 128) {
                    pixels[i][j][k] = 0;
                } else {
                    pixels[i][j][k] = 255;
                }
            }
        }
    }
    imageHandler.savePixels(pixels, outputPath);
}

/**
 * Image's scale down filter
 */
function scaleDownImage() {
    let outputPath = 'output/messi_scaled.jpg';
    let pixels = imageHandler.getPixels();

    // Scale down the image to half its size
    let newWidth = Math.floor(pixels.length / 2);
    let newHeight = Math.floor(pixels[0].length / 2);
    let scaledPixels = [];

    for (let i = 0; i < newWidth; i++) {
        let row = [];
        for (let j = 0; j < newHeight; j++) {
            row.push(pixels[i * 2][j * 2]);
        }
        scaledPixels.push(row);
    }
    imageHandler.savePixels(scaledPixels, outputPath, newWidth, newHeight);
}

/**
 * Image's brightness dimming filter
 * @param {number} dimFactor - The factor to dim the brightness (0 < dimFactor < 1)
 */
function dimBrightness(dimFactor) {
    let outputPath = 'output/messi_dim.jpg';
    let pixels = imageHandler.getPixels();

    // Dim the brightness of each pixel according to the dimFactor
    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            for (let k = 0; k < 3; k++) {
                pixels[i][j][k] = Math.floor(pixels[i][j][k] * dimFactor);
            }
        }
    }
    imageHandler.savePixels(pixels, outputPath);
}

/**
 * Image's color inversion filter
 */
function invertImageColor() {
    let outputPath = 'output/messi_inverted.jpg';
    let pixels = imageHandler.getPixels();

    // Invert the color of each pixel
    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            for (let k = 0; k < 3; k++) {
                pixels[i][j][k] = 255 - pixels[i][j][k];
            }
        }
    }
    imageHandler.savePixels(pixels, outputPath);
}

/**
 * Merge two images with given alpha values
 * @param alphaFirst - Alpha value for the first image (0 < alphaFirst <= 1 - alphaSecond)
 * @param alphaSecond - Alpha value for the second image (0 < alphaSecond <= 1 - alphaFirst)
 */
function mergeImages(alphaFirst, alphaSecond) {
    let catHandler = new ImageHandler('input/cat.jpg');
    let dogHandler = new ImageHandler('input/dog.jpg');
    let outputPath = 'output/merged.jpg';

    let catPixels = catHandler.getPixels();
    let dogPixels = dogHandler.getPixels();

    let pixels = [];

    // Merge the two images with the given alpha values
    for (let i = 0; i < catPixels.length; i++) {
        let row = [];
        for (let j = 0; j < catPixels[i].length; j++) {
            let mergedPixel = [
                Math.floor(catPixels[i][j][0] * alphaFirst + dogPixels[i][j][0] * alphaSecond),
                Math.floor(catPixels[i][j][1] * alphaFirst + dogPixels[i][j][1] * alphaSecond),
                Math.floor(catPixels[i][j][2] * alphaFirst + dogPixels[i][j][2] * alphaSecond)
            ];
            row.push(mergedPixel);
        }
        pixels.push(row);
    }
    dogHandler.savePixels(pixels, outputPath);
}

/**
 * Flag to choose the filter to apply
 * 1: RedFilter
 * 2: GreenFilter
 * 3: BlueFilter
 * 4: GrayFilter
 * 5: BlackAndWhiteFilter
 * 6: ScaleDownImage
 * 7: DimBrightness
 * 8: InvertImageColor
 * 9: MergeImages
 */
let filterCase = 9; // Change this value to select the filter

// Switch case to apply the selected filter
switch (filterCase) {
    case 1:
        redFilter();
        break;
    case 2:
        greenFilter();
        break;
    case 3:
        blueFilter();
        break;
    case 4:
        grayFilter();
        break;
    case 5:
        blackAndWhiteFilter();
        break;
    case 6:
        scaleDownImage();
        break;
    case 7:
        dimBrightness(0.5); // Dim brightness by 50%
        break;
    case 8:
        invertImageColor();
        break;
    case 9:
        mergeImages(0.5, 0.5); // Merge images with 50% cat and 50% dog
        break;
    default:
        break;
}