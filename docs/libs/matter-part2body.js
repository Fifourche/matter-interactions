/*!
 * matter-part2body 0.0.1 by Faris Abouaki 2022-05-21
 * https://github.com/Fifourche/matter-part2body
 * License MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("matter-js"));
	else if(typeof define === 'function' && define.amd)
		define(["matter-js"], factory);
	else if(typeof exports === 'object')
		exports["MatterPart2body"] = factory(require("matter-js"));
	else
		root["MatterPart2body"] = factory(root["Matter"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/libs";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Matter = __webpack_require__(0);

/**
 * A matter.js plugin to allow applying forces to parts of a body.
 * @module Part2Body
 */
var Part2Body = {
  // plugin meta
  name: 'matter-part2body', // PLUGIN_NAME
  version: '0.0.1', // PLUGIN_VERSION
  for: 'matter-js@^0.16.1',

  // installs the plugin where `base` is `Matter`
  // you should not need to call this directly.
  install: function install(base) {

    // before Matter.Body.applyForce, if the body is a part, return the parent in this 
    base.before('Body.applyForce', function (body, position, force) {
      var parent = topParent(body);

      if (parent != body) {
        return parent;
      }
    });

    // after Matter.Body.applyForce, if this is not empty, apply the force to the parent body
    base.after('Body.applyForce', function (body, position, force) {
      if (this != undefined) {
        Matter.Body.applyForce(this, position, force);
      }
    });
  }
};

Matter.Plugin.register(Part2Body);

module.exports = Part2Body;

/**
 * Function to get the top parent of a part.
 * @function topParent
 * @param {Matter.Body} part The body part.
 * @returns {Matter.Body} parent The top body containing the part.
 */
function topParent(part) {
  var parent = part.parent;

  if (parent != part) {
    parent = topParent(parent);
  }

  return parent;
}

/***/ })
/******/ ]);
});