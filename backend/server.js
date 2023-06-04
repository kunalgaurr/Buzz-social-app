const express = require('express');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');
const replyRoute = require('./routes/replyRoute');
const communityRoute = require('./routes/communityRoute');
const connectDB = require('./config/connectDB');

process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`.bold.red);
  console.log('Shutting down the server due to uncaught exception'.bold.red);
  process.exit(1);
});

dotenv.config({ path: './config/config.env' });

connectDB();

const PORT = process.env.PORT;

app.use(morgan('common'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    return cb(
      null,
      `image-${Date.now()}-${Math.random() * 1e9}-${file.originalname}`
    );
  },
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const imageUrl =
    req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
  return res.status(200).json({ imageUrl });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoute);
app.use('/api/reply', replyRoute);
app.use('/api/community', communityRoute);

app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT} on port ${PORT}`.bold.yellow
  );
});

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`.bold.red);
  console.log(
    'Shutting down the server due to Unhandled Promise Rejection'.bold.red
  );
  server.close(() => {
    process.exit(1);
  });
});
