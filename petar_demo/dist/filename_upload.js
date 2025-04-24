"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const SERVER_IMAGE_DIR = config_1.path.join(config_1.SERVER_IMAGE_DIR_ROOT, 'by_name');
function storeImageByName(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const clientFilePath = config_1.path.join(config_1.CLIENT_IMAGE_DIR, filename);
            const serverFilePath = config_1.path.join(SERVER_IMAGE_DIR, filename);
            const fileData = yield config_1.fs.readFile(clientFilePath);
            yield config_1.fs.writeFile(serverFilePath, fileData);
            console.log(`Image saved to: ${serverFilePath}`);
        }
        catch (error) {
            console.error('Error processing image:', error);
        }
    });
}
// Get filename from command line arguments
const filename = "dog.jpeg";
if (!filename) {
    console.error('Error: Filename argument is required.');
    process.exit(1);
}
storeImageByName(filename);
