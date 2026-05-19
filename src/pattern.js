const QUIET_ZONE_WIDTH = 4;
const FINDER_SIZE = 7;

// a "module" in this context is one square inside the QR code 
// representing one bit of data or part of a pattern, I think of them as a "pixel"
function modulesPerSide(version) {
  return 21 + 4 * (version - 1);
}

function resizeCanvas(canvas, version) {
  const width = modulesPerSide(version) + 2 * QUIET_ZONE_WIDTH;
  canvas.width = width;
  canvas.height = width;
}

// the quiet zone is a border of white space around the QR code
function createQuietZone(canvas, version) {
  const ctx = canvas.getContext("2d");
  ctx.lineWidth = QUIET_ZONE_WIDTH;
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

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

  // todo: make less bad, probably also include white space with sprites
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "green";
  ctx.fillRect(QUIET_ZONE_WIDTH, QUIET_ZONE_WIDTH, FINDER_SIZE + 1, FINDER_SIZE + 1);
  ctx.drawImage(offscreenCanvas, QUIET_ZONE_WIDTH, QUIET_ZONE_WIDTH);

  ctx.fillRect(QUIET_ZONE_WIDTH, QUIET_ZONE_WIDTH + qrWidth - FINDER_SIZE - 1, FINDER_SIZE + 1, FINDER_SIZE + 1);
  ctx.drawImage(offscreenCanvas, QUIET_ZONE_WIDTH, QUIET_ZONE_WIDTH + qrWidth - FINDER_SIZE);

  ctx.fillRect(QUIET_ZONE_WIDTH + qrWidth - FINDER_SIZE - 1, QUIET_ZONE_WIDTH, FINDER_SIZE + 1, FINDER_SIZE + 1);
  ctx.drawImage(offscreenCanvas, QUIET_ZONE_WIDTH + qrWidth - FINDER_SIZE, QUIET_ZONE_WIDTH);
}

// The timing patterns are 2 lines of alternating white and black modules going between the finders.
// You often don't notice them when looking at a QR code but they are always there.
function createTiming(canvas, version) {
  const ctx = canvas.getContext("2d");
  const qrWidth = modulesPerSide(version);

  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;

  // the rest
}

export function createPatternLayer(canvas, version) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  resizeCanvas(canvas, version);

  createQuietZone(canvas, version);
  createFinders(canvas, version);
}