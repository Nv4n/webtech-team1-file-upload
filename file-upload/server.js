import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 3000;

// Конфигурация за качване
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Позволени са само изображения'));
    }
    cb(null, true);
  }
});

app.use(express.static('public'));

// Основен път за HTML форма и fetch
app.post('/upload', upload.single('file'), (req, res) => {
  const { originalname, mimetype, size } = req.file;

  if (req.headers.accept === '*/*') {
    return res.json({ name: originalname, type: mimetype, size });
  }

  res.send(`
    <h2>Файлът е качен успешно!</h2>
    <ul>
      <li><strong>Име:</strong> ${originalname}</li>
      <li><strong>Тип:</strong> ${mimetype}</li>
      <li><strong>Размер:</strong> ${size} байта</li>
    </ul>
    <a href="/"> Назад</a>
  `);
});

// Обработка на грешки
app.use((err, req, res, next) => {
  res.status(400).send(`
    <h2> Грешка при качване</h2>
    <p>${err.message}</p>
    <a href="/"> Опитай отново</a>
  `);
});

app.listen(port, () => {
  console.log(`Сървърът работи на http://localhost:${port}`);
});
