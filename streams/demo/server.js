import express from "express";
import { createReadStream, createWriteStream } from "fs";
import { join } from "path";
import multer from "multer";
import { createGzip } from "zlib";
import cors from "cors";

const app = express();
const port = 5501;

// Качване на файл
const upload = multer({ dest: "uploads/" });

app.use(express.static("."));
app.use(cors());

// Компресирай файл при качване
app.post("/upload", upload.single("file"), (req, res) => {
	if (!req.file) {
		res.status(500).json({ message: "No file" }).end();
		return;
	}

	const sourcePath = req.file.path;
	const compressedPath = join("compressed", req.file.originalname + ".gz");

	// 1. Създаваме Read и Write стриймове
	const readStream = createReadStream(sourcePath);
	const writeStream = createWriteStream(compressedPath);
	const gzip = createGzip();

	// 2. Pipe верига с обработка
	readStream
		.pipe(gzip)
		.pipe(writeStream)
		.on("finish", () => {
			res.json({ message: "Файлът беше компресиран успешно!" });
		});

	// 3. Какво е Backpressure?
	// Ако writeStream пише по-бавно от четенето, Node автоматично паузира readStream
	// pipe() управлява това автоматично, което избягва "backpressure" проблема
});

class SlowWritable extends Writable {
	_write(chunk, encoding, callback) {
		// Simulate delay
		setTimeout(() => {
			process.stdout.write(`Writing chunk (${chunk.length} bytes)...\n`);
			callback();
		}, 200); // slow "disk"
	}
}

app.post("/upload-slow", upload.single("file"), (req, res) => {
	const sourcePath = req.file.path;
	const readStream = fs.createReadStream(sourcePath);
	const slowWritable = new SlowWritable();

	readStream.on("data", (chunk) => {
		const ok = slowWritable.write(chunk);
		if (!ok) {
			console.log("Backpressure! Pausing read stream...");
			readStream.pause();
			slowWritable.once("drain", () => {
				console.log("Drain! Resuming read stream...");
				readStream.resume();
			});
		}
	});

	readStream.on("end", () => {
		console.log("Read complete!");
		res.send("File received and written slowly (with backpressure).");
	});
});

app.get("/xhr-stream", (req, res) => {
	res.setHeader("Content-Type", "text/plain");
	res.setHeader("Transfer-Encoding", "chunked");

	let i = 0;
	const interval = setInterval(() => {
		if (i >= 5) {
			res.end("\nDone!");
			clearInterval(interval);
			return;
		}
		res.write(`Chunk ${i}\n`);
		i++;
	}, 1000);
});

app.listen(port, () => {
	console.log(`Сървърът работи на http://localhost:${port}`);
});
