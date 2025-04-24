const fs = require('fs');

//const stream = fs.createReadStream('file.txt', 'utf8');
const stream = fs.createReadStream('file.txt', { encoding: 'utf8', highWaterMark: 16 });

stream.on('data', chunk => {
  console.log('Получен chunk с дължина:', chunk.length);
});

stream.on('end', () => {
  console.log('Четенето завърши.');
});

stream.on('error', err => {
  console.error('Грешка при четене:', err);
});

