async function demoFunc() {
    let fr = document.createElement('p')


    const writableStream = new WritableStream({
        start(controller) {
            console.log('[start]');
            document.body.appendChild(fr)
        },
        async write(chunk, controller) {
            console.log('[write]', chunk);
            // Wait for next write.
            await new Promise((resolve) => setTimeout(() => {
                fr.innerText += chunk
                resolve();
            }, 1_000));
        },
        close(controller) {
            console.log('[close]');
        },
        abort(reason) {
            console.log('[abort]', reason);
        },
    });

    const writer = writableStream.getWriter();
    const start = Date.now();
    for (const char of 'abcdefghijklmnopqrstuvwxyz') {
        // Wait to add to the write queue.
        await writer.ready;
        console.log('[ready]', Date.now() - start, 'ms');
        // The Promise is resolved after the write finishes.
        writer.write(char);
    }
    await writer.close();
}

demoFunc();