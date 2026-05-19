import { modulesPerSide, setPixelColor, getPixelColor } from "./helpers.js";
import { FINDER_SIZE, ALIGNMENT_SIZE } from "./constants.js";

// "finders" are the three large squares in the corners
function createFinders(canvas, version) {
  const qrWidth = modulesPerSide(version);

  // todo: maybe make sprites or something instead of drawing every single time
  const offscreenCanvas = document.createElement("canvas");
  offscreenCanvas.width = FINDER_SIZE;
  offscreenCanvas.height = FINDER_SIZE;
  const offscreenCtx = offscreenCanvas.getContext("2d");

  offscreenCtx.fillStyle = "black";
  offscreenCtx.fillRect(0, 0, FINDER_SIZE, FINDER_SIZE);
  offscreenCtx.fillStyle = "white";
  offscreenCtx.fillRect(1, 1, FINDER_SIZE - 2, FINDER_SIZE - 2);
  offscreenCtx.fillStyle = "black";
  offscreenCtx.fillRect(2, 2, FINDER_SIZE - 4, FINDER_SIZE - 4);

  // todo: probably also include white space with sprites
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, FINDER_SIZE + 1, FINDER_SIZE + 1);
  ctx.drawImage(offscreenCanvas, 0, 0);

  ctx.fillRect(0, qrWidth - FINDER_SIZE - 1, FINDER_SIZE + 1, FINDER_SIZE + 1);
  ctx.drawImage(offscreenCanvas, 0, qrWidth - FINDER_SIZE);

  ctx.fillRect(qrWidth - FINDER_SIZE - 1, 0, FINDER_SIZE + 1, FINDER_SIZE + 1);
  ctx.drawImage(offscreenCanvas, qrWidth - FINDER_SIZE, 0);
}

// The timing patterns are 2 lines of alternating white and black modules going between the finders.
// You often don't notice them when looking at a QR code but they are always there.
function createTiming(canvas, version) {
  const ctx = canvas.getContext("2d");
  const qrWidth = modulesPerSide(version);
  const timingSize = qrWidth - (FINDER_SIZE + 1) * 2

  const horizontalTiming = ctx.createImageData(timingSize, 1);
  const verticalTiming = ctx.createImageData(1, timingSize);

  for (let i = 0; i < timingSize; i++) {
    const pixelDataStart = i * 4;
    const color = i % 2 === 0 ? 0 : 255;

    setPixelColor(horizontalTiming, pixelDataStart, color, color, color);
    setPixelColor(verticalTiming, pixelDataStart, color, color, color);
  }

  ctx.putImageData(horizontalTiming, FINDER_SIZE + 1, FINDER_SIZE - 1);
  ctx.putImageData(verticalTiming, FINDER_SIZE - 1, FINDER_SIZE + 1);
}

function createAlignment(canvas, version) {
  if (version === 1) {
    return;
  }

  // todo: alignment square could also be a sprite
  const alignmentSquare = document.createElement("canvas");
  alignmentSquare.width = ALIGNMENT_SIZE;
  alignmentSquare.height = ALIGNMENT_SIZE;

  const alignmentCtx = alignmentSquare.getContext("2d");
  alignmentCtx.fillStyle = "black";
  alignmentCtx.fillRect(0, 0, ALIGNMENT_SIZE, ALIGNMENT_SIZE);
  alignmentCtx.fillStyle = "white";
  alignmentCtx.fillRect(1, 1, ALIGNMENT_SIZE - 2, ALIGNMENT_SIZE - 2);
  alignmentCtx.fillStyle = "black";
  alignmentCtx.fillRect(2, 2, ALIGNMENT_SIZE - 4, ALIGNMENT_SIZE - 4);

  // the number of alignment squares is effectively gridSize^2 - 3
  const gridSize = Math.floor(version / 7) + 2;
  const gapSize = Math.floor((modulesPerSide(version) - 2 * (FINDER_SIZE)) / (gridSize - 1)) + 1;
  const alignmentStart = FINDER_SIZE - 1;
  const alignmentEnd = modulesPerSide(version) - FINDER_SIZE;
  const gapsEnd = alignmentStart + gapSize * (gridSize - 1);

  const ctx = canvas.getContext("2d");

  let y = alignmentStart;
  for (let row = 0; row < gridSize; row++) {
    if (row > 0) {
      y += gapSize;
    }

    // if the gaps are uneven, the first gap is shortest.
    if (row === 1 && gapsEnd > alignmentEnd) {
      y -= gapsEnd - alignmentEnd;
    }

    let x = alignmentStart;
    for (let col = 0; col < gridSize; col++) {
      // skip if there's a finder in the way
      if ((row === 0 && col === 0) || (row === 0 && col === gridSize - 1) || (row === gridSize - 1 && col === 0)) {
        continue;
      }

      if (col > 0) {
        x += gapSize;
      }

      // if the gaps are uneven, the first gap is shortest.
      if (col === 1 && gapsEnd > alignmentEnd) {
        x -= gapsEnd - alignmentEnd;
      }

      ctx.drawImage(alignmentSquare, x - 2, y - 2);
    }
  }
}

export function createPatternLayer(version) {
  const canvas = document.createElement("canvas");
  canvas.width = modulesPerSide(version);
  canvas.height = modulesPerSide(version);

  createFinders(canvas, version);
  createTiming(canvas, version);
  createAlignment(canvas, version);

  return canvas;
}