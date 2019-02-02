"use strict";

const runWebpack = require("../utils/webpack");
const fixtures = require("../utils/fixtures");
const { expect } = require("chai");

describe("Webpack tests", () => {

  it("instruments code without an existing sourcemap", async () => {
    const stats = await runWebpack({
      entry: fixtures["esm-sample.js"].path
    });

    const instrumentedSource = stats.compilation.assets["main.js"].source();
    expect(instrumentedSource).to.contain(`var path = "${fixtures.escapedPath}esm-sample.js"`);
    expect(instrumentedSource).to.contain(`path: "${fixtures.escapedPath}esm-sample.js"`);

    const instrumentedSourceMap = JSON.parse(stats.compilation.assets["main.js.map"].source());
    expect(instrumentedSourceMap).to.deep.equal({
      version: 3,
      sources: [
        "webpack:///webpack/bootstrap",
        "webpack:///./test/fixtures/esm-sample.js"
      ],
      names: [
        "Foo",
        "bar"
      ],
      mappings: ";AAAA;AACA;;AAEA;AACA;;AAEA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;;AAEA;AACA;;AAEA;AACA;;AAEA;AACA;AACA;;;AAGA;AACA;;AAEA;AACA;;AAEA;AACA;AACA;AACA,kDAA0C,gCAAgC;AAC1E;AACA;;AAEA;AACA;AACA;AACA,gEAAwD,kBAAkB;AAC1E;AACA,yDAAiD,cAAc;AAC/D;;AAEA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA,iDAAyC,iCAAiC;AAC1E,wHAAgH,mBAAmB,EAAE;AACrI;AACA;;AAEA;AACA;AACA;AACA,mCAA2B,0BAA0B,EAAE;AACvD,yCAAiC,eAAe;AAChD;AACA;AACA;;AAEA;AACA,8DAAsD,+DAA+D;;AAErH;AACA;;;AAGA;AACA;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AClFe,MAAMA,GAAN,CAAU;AACvBC,KAAG,GAAI;AAAA;AAAA;AACL,WAAO,CAAC,CAAC,IAAT;AACD;;AAHsB;AAIxB,C",
      file: "main.js",
      sourcesContent: [
        " \t// The module cache\n \tvar installedModules = {};\n\n \t// The require function\n \tfunction __webpack_require__(moduleId) {\n\n \t\t// Check if module is in cache\n \t\tif(installedModules[moduleId]) {\n \t\t\treturn installedModules[moduleId].exports;\n \t\t}\n \t\t// Create a new module (and put it into the cache)\n \t\tvar module = installedModules[moduleId] = {\n \t\t\ti: moduleId,\n \t\t\tl: false,\n \t\t\texports: {}\n \t\t};\n\n \t\t// Execute the module function\n \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n\n \t\t// Flag the module as loaded\n \t\tmodule.l = true;\n\n \t\t// Return the exports of the module\n \t\treturn module.exports;\n \t}\n\n\n \t// expose the modules object (__webpack_modules__)\n \t__webpack_require__.m = modules;\n\n \t// expose the module cache\n \t__webpack_require__.c = installedModules;\n\n \t// define getter function for harmony exports\n \t__webpack_require__.d = function(exports, name, getter) {\n \t\tif(!__webpack_require__.o(exports, name)) {\n \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n \t\t}\n \t};\n\n \t// define __esModule on exports\n \t__webpack_require__.r = function(exports) {\n \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n \t\t}\n \t\tObject.defineProperty(exports, '__esModule', { value: true });\n \t};\n\n \t// create a fake namespace object\n \t// mode & 1: value is a module id, require it\n \t// mode & 2: merge all properties of value into the ns\n \t// mode & 4: return value when already ns object\n \t// mode & 8|1: behave like require\n \t__webpack_require__.t = function(value, mode) {\n \t\tif(mode & 1) value = __webpack_require__(value);\n \t\tif(mode & 8) return value;\n \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n \t\tvar ns = Object.create(null);\n \t\t__webpack_require__.r(ns);\n \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n \t\treturn ns;\n \t};\n\n \t// getDefaultExport function for compatibility with non-harmony modules\n \t__webpack_require__.n = function(module) {\n \t\tvar getter = module && module.__esModule ?\n \t\t\tfunction getDefault() { return module['default']; } :\n \t\t\tfunction getModuleExports() { return module; };\n \t\t__webpack_require__.d(getter, 'a', getter);\n \t\treturn getter;\n \t};\n\n \t// Object.prototype.hasOwnProperty.call\n \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n\n \t// __webpack_public_path__\n \t__webpack_require__.p = \"\";\n\n\n \t// Load entry module and return exports\n \treturn __webpack_require__(__webpack_require__.s = \"./test/fixtures/esm-sample.js\");\n",
        "export default class Foo {\n  bar () {\n    return !!this;\n  }\n};\n"
      ],
      sourceRoot: ""
    });
  });

  it("instruments code with an existing sourcemap", async () => {
    const stats = await runWebpack({
      entry: fixtures["ts-sample.js"].path
    });

    const instrumentedSource = stats.compilation.assets["main.js"].source();
    expect(instrumentedSource).to.contain(`var path = "${fixtures.escapedPath}ts-sample.js"`);
    expect(instrumentedSource).to.contain(`path: "${fixtures.escapedPath}ts-sample.js"`);

    const instrumentedSourceMap = JSON.parse(stats.compilation.assets["main.js.map"].source());
    expect(instrumentedSourceMap).to.deep.equal({
      version: 3,
      sources: [
        "webpack:///webpack/bootstrap",
        "webpack:///ts-sample.ts"
      ],
      names: [],
      mappings: ";AAAA;AACA;;AAEA;AACA;;AAEA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;;AAEA;AACA;;AAEA;AACA;;AAEA;AACA;AACA;;;AAGA;AACA;;AAEA;AACA;;AAEA;AACA;AACA;AACA,kDAA0C,gCAAgC;AAC1E;AACA;;AAEA;AACA;AACA;AACA,gEAAwD,kBAAkB;AAC1E;AACA,yDAAiD,cAAc;AAC/D;;AAEA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA,iDAAyC,iCAAiC;AAC1E,wHAAgH,mBAAmB,EAAE;AACrI;AACA;;AAEA;AACA;AACA;AACA,mCAA2B,0BAA0B,EAAE;AACvD,yCAAiC,eAAe;AAChD;AACA;AACA;;AAEA;AACA,8DAAsD,+DAA+D;;AAErH;AACA;;;AAGA;AACA;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AClFA,MAAqB,GAArB,CAAwB;AACf,KAAG;AAAA;AAAA;AACR,WAAO,CAAC,CAAC,IAAT;AACD;;AAHqB;;;AAAxB,sB",
      file: "main.js",
      sourcesContent: [
        " \t// The module cache\n \tvar installedModules = {};\n\n \t// The require function\n \tfunction __webpack_require__(moduleId) {\n\n \t\t// Check if module is in cache\n \t\tif(installedModules[moduleId]) {\n \t\t\treturn installedModules[moduleId].exports;\n \t\t}\n \t\t// Create a new module (and put it into the cache)\n \t\tvar module = installedModules[moduleId] = {\n \t\t\ti: moduleId,\n \t\t\tl: false,\n \t\t\texports: {}\n \t\t};\n\n \t\t// Execute the module function\n \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n\n \t\t// Flag the module as loaded\n \t\tmodule.l = true;\n\n \t\t// Return the exports of the module\n \t\treturn module.exports;\n \t}\n\n\n \t// expose the modules object (__webpack_modules__)\n \t__webpack_require__.m = modules;\n\n \t// expose the module cache\n \t__webpack_require__.c = installedModules;\n\n \t// define getter function for harmony exports\n \t__webpack_require__.d = function(exports, name, getter) {\n \t\tif(!__webpack_require__.o(exports, name)) {\n \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n \t\t}\n \t};\n\n \t// define __esModule on exports\n \t__webpack_require__.r = function(exports) {\n \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n \t\t}\n \t\tObject.defineProperty(exports, '__esModule', { value: true });\n \t};\n\n \t// create a fake namespace object\n \t// mode & 1: value is a module id, require it\n \t// mode & 2: merge all properties of value into the ns\n \t// mode & 4: return value when already ns object\n \t// mode & 8|1: behave like require\n \t__webpack_require__.t = function(value, mode) {\n \t\tif(mode & 1) value = __webpack_require__(value);\n \t\tif(mode & 8) return value;\n \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n \t\tvar ns = Object.create(null);\n \t\t__webpack_require__.r(ns);\n \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n \t\treturn ns;\n \t};\n\n \t// getDefaultExport function for compatibility with non-harmony modules\n \t__webpack_require__.n = function(module) {\n \t\tvar getter = module && module.__esModule ?\n \t\t\tfunction getDefault() { return module['default']; } :\n \t\t\tfunction getModuleExports() { return module; };\n \t\t__webpack_require__.d(getter, 'a', getter);\n \t\treturn getter;\n \t};\n\n \t// Object.prototype.hasOwnProperty.call\n \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n\n \t// __webpack_public_path__\n \t__webpack_require__.p = \"\";\n\n\n \t// Load entry module and return exports\n \treturn __webpack_require__(__webpack_require__.s = \"./test/fixtures/ts-sample.js\");\n",
        null
      ],
      sourceRoot: ""
    }
    );
  });

});
