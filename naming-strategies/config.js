"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_IMAGE_DIR_ROOT = exports.CLIENT_IMAGE_DIR = exports.uuidv4 = exports.path = exports.fs = void 0;
// config.ts
var path = require("path");
exports.path = path;
var fs = require("fs/promises");
exports.fs = fs;
var uuid_1 = require("uuid");
Object.defineProperty(exports, "uuidv4", { enumerable: true, get: function () { return uuid_1.v4; } });
var CLIENT_IMAGE_DIR = path.join(__dirname, 'images_client');
exports.CLIENT_IMAGE_DIR = CLIENT_IMAGE_DIR;
var SERVER_IMAGE_DIR_ROOT = path.join(__dirname, 'images_server');
exports.SERVER_IMAGE_DIR_ROOT = SERVER_IMAGE_DIR_ROOT;
