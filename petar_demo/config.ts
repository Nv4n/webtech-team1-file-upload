// config.ts
import * as path from 'path';
import * as fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const CLIENT_IMAGE_DIR = path.join(__dirname, 'images_client');
const SERVER_IMAGE_DIR_ROOT = path.join(__dirname, 'images_server');

export {
  fs,
  path,
  uuidv4,
  CLIENT_IMAGE_DIR,
  SERVER_IMAGE_DIR_ROOT
};

export {};