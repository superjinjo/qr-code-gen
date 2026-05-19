import { modulesPerSide } from "./helpers.js";
import { QUIET_ZONE_WIDTH } from "./constants.js";
import { createPatternLayer } from "./pattern.js";

function resizeCanvas(canvas, version) {
  // may experiment with translation later but for now we just resize with CSS
  const width = modulesPerSide(version) + 2 * QUIET_ZONE_WIDTH;
  canvas.width = width;
  canvas.height = width;
}

// the quiet zone is a border of white space around the QR code
function createQuietZone(canvas, version) {
  const ctx = canvas.getContext("2d");
  ctx.lineWidth = QUIET_ZONE_WIDTH;

  // green for now so I can see alpha in other layers
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function generateQRCode(canvas, version) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  resizeCanvas(canvas, version);
  createQuietZone(canvas, version);

  const patternCanvas = createPatternLayer(version);
  ctx.drawImage(patternCanvas, QUIET_ZONE_WIDTH, QUIET_ZONE_WIDTH);
}