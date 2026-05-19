// a "module" in this context is one tiny square inside the QR code 
// representing one bit of data or part of a pattern. I think of them as a "pixel"
export function modulesPerSide(version) {
  return 21 + 4 * (version - 1);
}

export function setPixelColor(imageData, startIndex, r, g, b, a = 255) {
  imageData.data[startIndex] = r;
  imageData.data[startIndex + 1] = g;
  imageData.data[startIndex + 2] = b;
  imageData.data[startIndex + 3] = a;
}

export function getPixelColor(imageData, x, y) {
  const index = (y * imageData.width + x) * 4;
  return {
    r: imageData.data[index],
    g: imageData.data[index + 1],
    b: imageData.data[index + 2],
    a: imageData.data[index + 3],
  };
}