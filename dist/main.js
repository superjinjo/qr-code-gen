/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module './generate'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());




function main() {
  console.log("Hello, World!");

  const versionInput = document.getElementById("version");
  let version = versionInput.value;

  versionInput.addEventListener("input", (event) => {
    version = parseInt(event.target.value);
    console.log("version: ", version);
    const canvas = document.getElementById("qr-canvas");
    Object(function webpackMissingModule() { var e = new Error("Cannot find module './generate'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(canvas, version);
  });
}

main();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7O0FDTDRDOzs7QUFHNUM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx5SUFBYztBQUNsQixHQUFHO0FBQ0g7O0FBRUEsTyIsInNvdXJjZXMiOlsid2VicGFjazovL3FyLXRlc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcXItdGVzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3FyLXRlc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuaW1wb3J0IHsgZ2VuZXJhdGVRUkNvZGUgfSBmcm9tIFwiLi9nZW5lcmF0ZVwiO1xuXG5cbmZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnNvbGUubG9nKFwiSGVsbG8sIFdvcmxkIVwiKTtcblxuICBjb25zdCB2ZXJzaW9uSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZlcnNpb25cIik7XG4gIGxldCB2ZXJzaW9uID0gdmVyc2lvbklucHV0LnZhbHVlO1xuXG4gIHZlcnNpb25JbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgdmVyc2lvbiA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgY29uc29sZS5sb2coXCJ2ZXJzaW9uOiBcIiwgdmVyc2lvbik7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxci1jYW52YXNcIik7XG4gICAgZ2VuZXJhdGVRUkNvZGUoY2FudmFzLCB2ZXJzaW9uKTtcbiAgfSk7XG59XG5cbm1haW4oKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=