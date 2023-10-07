const express = require('express');
const bodyParser = require('body-parser');

const allGroupData = require('./routes/allGroupData.routes');
const groupData = require('./routes/groupData.routes');
const itemData = require('./routes/itemData.routes');
const searchData = require('./routes/searchData.routes');
const sortVariantsData = require('./routes/sortVariantsData.routes');
const fullData = require('./routes/fullData.routes');
const moysklad = require('./service/service');

const sendBot = require('./routes/sendBot.routes');
const promocode = require('./routes/promocode.routes');
const categories = require('./routes/categories.routes');
const getData = require('./routes/getData.routes');
const getSorts = require('./routes/getSorts.routes');

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

app.use('/api', sendBot);
app.use('/api', promocode);
app.use('/api', categories);
app.use('/api', getData);
app.use('/api', getSorts);

app.use('/api', allGroupData);
app.use('/api', groupData);
app.use('/api', itemData);
app.use('/api', searchData);
app.use('/api', sortVariantsData);
app.use('/api', fullData);
app.use('/images', express.static('./images'));
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
          }, 20 * 60 * 1000);
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
