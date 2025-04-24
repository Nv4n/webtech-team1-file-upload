import cors from "cors";
import express from "express";
import fs, { createReadStream, createWriteStream } from "fs";
import multer from "multer";
import { join } from "path";
import { createGzip } from "zlib";
import { SlowWritable } from "./SlowWritable.js";
import compression from "compression";

const app = express();
const port = 5501;

const upload = multer({ dest: "uploads/" });

app.use(express.static("."));
app.use(cors());
app.use(compression());

app.post("/upload", upload.single("file"), (req, res) => {
	if (!req.file) {
		res.status(500).json({ message: "No file" }).end();
		return;
	}

	const sourcePath = req.file.path;
	const compressedPath = join("compressed", req.file.originalname + ".gz");

	const readStream = createReadStream(sourcePath);
	const writeStream = createWriteStream(compressedPath);
	const gzip = createGzip();

	readStream
		.pipe(gzip)
		.pipe(writeStream)
		.on("finish", () => {
			res.json({ message: "Файлът беше компресиран успешно!" });
		});
});

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
		res.json({
			message: "File received and written slowly (with backpressure).",
		});
	});
});

app.get("/xhr-stream", (req, res) => {
	res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
	res.setHeader("Transfer-Encoding", "chunked");
	res.setHeader("Cache-Control", "no-cache");
	res.flushHeaders?.();

	let i = 0;
	const interval = setInterval(() => {
		if (i >= 5) {
			res.write("done\n");
			res.end();
			clearInterval(interval);
			return;
		}
		res.write(`Chunk ${i}\n`);
		res.flush();
		console.log(`xhr chunk ${i}`);
		i++;
	}, 250);
});

app.listen(port, () => {
	console.log(`Сървърът работи на http://localhost:${port}`);
});
