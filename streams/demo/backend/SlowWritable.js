import { Writable } from "stream";

export class SlowWritable extends Writable {
	_write(chunk, encoding, callback) {
		// Simulate delay
		setTimeout(() => {
			process.stdout.write(`Writing chunk (${chunk.length} bytes)...\n`);
			callback();
		}, 250); // slow "disk"
	}
}
