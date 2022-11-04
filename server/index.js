const express = require('express');
const bodyParser = require('body-parser');

const config = require('config');

const allGroupData = require('./routes/allGroupData.routes');
const groupData = require('./routes/groupData.routes');
const itemData = require('./routes/itemData.routes');
const sendBot = require('./routes/sendBot.routes');
const searchData = require('./routes/searchData.routes');

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const PORT = config.get('serverPort');

app.use('/api', allGroupData);
app.use('/api', groupData);
app.use('/api', itemData);
app.use('/api', sendBot);
app.use('/api', searchData);

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log('123', PORT);
    });
  } catch (e) {}
};

start();
