/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request.js */ \"./request.js\");\n\n\n_request_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n.get('http://localhost:8080/index.js')\n.then(([response, data]) => {\n    return response.blob();\n})\n.get('http://localhost:8080/request.js')\n.then(([response, data]) => {\n    console.log(response, data);\n})\n.catch(() => {\n    console.log(`Нет доступа к ресурсу`);\n});\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./request.js":
/*!********************!*\
  !*** ./request.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n *  Класс для обработки последовательных запросов.\n */\nclass Request {\n    /**\n     * Конструктор класса\n     */\n    constructor(...args) {\n        this._state = new Promise(...args);\n    }\n    /**\n     * Совершает асинхронный запрос к ресурсу.\n     * @param {string} url\n     * @param {Object} [options]\n     * @param {Request} [self]\n     * @return {Request}\n     */\n    static get(url, options = {}, self = undefined) {\n        if (self instanceof Request) {\n            self._state = self._state.then(\n                (data) => fetch(url, options)\n                    .then((response) => {\n                        return Promise.all([\n                            response,\n                            data,\n                        ]);\n                    })\n        );\n            return self;\n        }\n        return new this(\n            (resolve, reject) => fetch(url, options)\n                .then((response) => {\n                    resolve([response, []]);\n                })\n        );\n    }\n    /**\n     * Совершает асинхронный запрос\n     * @param {string} url\n     * @param {Object} [options]\n     * @return {Request}\n     */\n    get(url, options) {\n        return this.constructor.get(url, options, this);\n    }\n    /**\n     * Обрабатывает ответ от текущего и данные от прошлого запроса.\n     * then([response, data])\n     * @return {Request}\n     */\n    then(...args) {\n        this._state = this._state.then(...args);\n        return this;\n    }\n    /**\n     * Обрабатывает ошибки, при запросе к ресурсу.\n     * Вызывается если в ответе статус > 400.\n     * catch([response, data])\n     * @return {Request}\n     */\n    catch(...args) {\n        this._state = this._state.catch(...args);\n        return this;\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Request);\n\n\n//# sourceURL=webpack:///./request.js?");

/***/ })

/******/ });