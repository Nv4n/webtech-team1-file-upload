import { Writable } from "stream";

export class SlowWritable extends Writable {
	_write(chunk, encoding, callback) {
		setTimeout(() => {
			process.stdout.write(`Writing chunk (${chunk.length} bytes)...\n`);
			callback();
		}, 3000); 
	}
}
