import { fs, path, CLIENT_IMAGE_DIR, SERVER_IMAGE_DIR_ROOT } from './config';

const SERVER_IMAGE_DIR = path.join(SERVER_IMAGE_DIR_ROOT, 'by_name');

async function storeImageByName(filename: string): Promise<void> {
  try {
    const clientFilePath = path.join(CLIENT_IMAGE_DIR, filename);
    const serverFilePath = path.join(SERVER_IMAGE_DIR, filename);

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

storeImageByName(filename);

export {}; // Add this line at the end of the file!