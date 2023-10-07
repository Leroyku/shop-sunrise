const express = require('express');
const bodyParser = require('body-parser');

const moysklad = require('./service/service');
const images = require('./routes/images.routes');
const categories_images = require('./routes/categories_images.routes');

const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json({ limit: '1mb' }));
app.use(bodyParser.json());
app.use('/api', images);
app.use('/api', categories_images);

app.use('/images', express.static('./images'));
app.use('/categories_images', express.static('./categories_images'));
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

const IP_ADDRESS = process.env.APP_IP || '0.0.0.0';
const PORT = process.env.APP_PORT || 5000;

const start = () => {
  try {
    app.listen(PORT, IP_ADDRESS, () => {
      moysklad
        .moyskladGet()
        .then(() => {
          setInterval(() => {
            moysklad.moyskladGet().catch((error) => {
              console.error('Ошибка при вызове moyskladGet внутри интервала:', error);
            });
          }, 5 * 60 * 1000);
        })
        .catch((error) => {
          console.error('Ошибка при вызове moyskladGet:', error);
        });

      console.log(`Server is running on ${IP_ADDRESS}:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

start();
