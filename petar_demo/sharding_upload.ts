import { fs, path, uuidv4, CLIENT_IMAGE_DIR, SERVER_IMAGE_DIR_ROOT } from './config';

const SERVER_IMAGE_DIR_ROOT_SHARDING = path.join(SERVER_IMAGE_DIR_ROOT, 'by_sharding');

async function storeImageBySharding(filename: string): Promise<void> {
  try {
    const clientFilePath = path.join(CLIENT_IMAGE_DIR, filename);
    const fileExtension = path.extname(filename);
    const uuid = uuidv4();
    const shard = uuid.substring(0, 2);
    const shardDir = path.join(SERVER_IMAGE_DIR_ROOT_SHARDING, shard);
    const newFilename = `${uuid}${fileExtension}`;
    const serverFilePath = path.join(shardDir, newFilename);

    // Create the shard directory if it doesn't exist
    await fs.mkdir(shardDir, { recursive: true });

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

storeImageBySharding(filename);

export {}; // Add this line at the end of the file!