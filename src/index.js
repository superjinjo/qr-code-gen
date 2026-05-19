import { createPatternLayer } from "./pattern.js";

function main() {
  console.log("Hello, World!");

  const versionInput = document.getElementById("version");
  let version = versionInput.value;

  versionInput.addEventListener("input", (event) => {
    version = parseInt(event.target.value);
    console.log("version: ", version);
    const canvas = document.getElementById("qr-canvas");
    createPatternLayer(canvas, version);
  });
}

main();