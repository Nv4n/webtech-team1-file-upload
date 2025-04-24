// timestamp_upload.ts
import { fs, path, CLIENT_IMAGE_DIR, SERVER_IMAGE_DIR_ROOT } from './config';

const SERVER_IMAGE_DIR = path.join(SERVER_IMAGE_DIR_ROOT, 'by_timestamp');

async function storeImageByTimestamp(filename: string): Promise<void> {
  try {
    const clientFilePath = path.join(CLIENT_IMAGE_DIR, filename);
    const fileExtension = path.extname(filename);
    const baseFilename = path.basename(filename, fileExtension);
    const timestamp = Date.now();
    const newFilename = `${baseFilename}_${timestamp}${fileExtension}`;
    const serverFilePath = path.join(SERVER_IMAGE_DIR, newFilename);

    const fileData = await fs.readFile(clientFilePath);
    await fs.writeFile(serverFilePath, fileData);

    console.log(`Image saved to: ${serverFilePath}`);
  } catch (error: any) {
    console.error('Error processing image:', error);
  }
}

// Get filename from command line arguments
const filename = "dog.jpeg";

if (!filename) {
  console.error('Error: Filename argument is required.');
  process.exit(1);
}

storeImageByTimestamp(filename);

export {}; // Add this line at the end of the file!