import { modulesPerSide, setPixelColor } from "./helpers.js";
import { FINDER_SIZE } from "./constants.js";

// "finders" are the three large squares in the corners
function createFinders(canvas, version) {
  const qrWidth = modulesPerSide(version);

  // todo: maybe make sprites or something instead of drawing every single time
  const offscreenCanvas = document.createElement("canvas");
  offscreenCanvas.width = FINDER_SIZE;
  offscreenCanvas.height = FINDER_SIZE;
  const offscreenCtx = offscreenCanvas.getContext("2d");
  console.log("offscreenCtx: ", offscreenCtx);

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

export function createPatternLayer(version) {
  const canvas = document.createElement("canvas");
  canvas.width = modulesPerSide(version);
  canvas.height = modulesPerSide(version);

  createFinders(canvas, version);
  createTiming(canvas, version);

  return canvas;
}