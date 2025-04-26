const fs = require('fs');
const { Transform } = require('stream');

let total = 0;

const wordCounter = new Transform({
  transform(chunk, _, cb) {
    const words = chunk.toString().split(/\s+/).filter(Boolean);
    total += words.length;
    cb();
  },
  flush(cb) {
    console.log('Общо думи:', total);
    cb();
  }
});

// fs.createReadStream('file.txt')
//   .pipe(wordCounter)
//   .on('finish', () => {
//     console.log('Четенето и обработката приключиха.');
//   });


fs.createReadStream('doklad-apis.docx')
  .pipe(wordCounter)
  .on('finish', () => {
    console.log('Четенето и обработката приключиха.');
  });
