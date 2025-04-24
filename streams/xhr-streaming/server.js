const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 5501;

const server = http.createServer((req, res) => {
    console.log(req)
    const parsedUrl = url.parse(req.url, true);
    const requestPath = parsedUrl.pathname;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    switch (requestPath) {
        case '/index':
            // Serve the index.html file
            fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            });
            break;

        case '/stream':
            // Set the appropriate headers for streaming
            res.writeHead(200, {
                'Content-Type': 'application/x-javascript',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            });

            // Send data every 3 seconds
            const interval = setInterval(() => {
                res.write("data event! ... ");
            }, 3000);

            // Close the interval when the client disconnects
            req.on('close', () => {
                clearInterval(interval);
            });
            break;

        default:
            // Handle 404 Not Found
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            break;
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});