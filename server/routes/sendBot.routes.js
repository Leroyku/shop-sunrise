const Router = require('express');

const router = new Router();
const TelegramBot = require('node-telegram-bot-api');
const nodemailer = require('nodemailer');

const config = require('config');
require('dotenv').config();

const TOKEN = process.env.TOKEN_TG;
const CHAT_ID = process.env.CHAT_ID;
const bot = new TelegramBot(TOKEN, { polling: true });

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const clearMessage = (msg, tg) => {
  let clearItems = `${msg.items.map((item) =>
    tg
      ? `${item.name} в количестве ${item.count}
`
      : `<li>${item.name} в количестве ${item.count}</li>`,
  )}`;

  clearItems = clearItems.replaceAll(',', '');

  let message = '';

  if (tg) {
    message += `<b>Новый заказ на сумму: ${msg.price} рублей </b> \n`;
    message += `<b>Имя:</b> ${msg.name}\n`;
    message += `<b>Почта:</b> ${msg.email}\n`;
    message += `<b>Телефон:</b> ${msg.tel}\n`;
    message += `<b>Вид доставки:</b> ${msg.delivery}\n`;
    message += `<b>Адрес:</b> ${msg.address}\n`;
    message += `<b>Комментарий:</b> ${msg.comment}\n`;
    message += `<b>Товары:</b>\n`;
    message += clearItems;
  } else {
    message = `<h2>Новый заказ на сумму: ${msg.price} рублей</h2>

  <ul>
    <li>
      <b>Имя:</b> ${msg.name}
    </li>
    <li>
      <b>Почта:</b> ${msg.email}
    </li>
    <li>
      <b>Телефон:</b> ${msg.tel}
    </li>
    <li>
      <b>Вид доставки:</b> ${msg.delivery}
    </li>
    <li>
      <b>Адрес:</b> ${msg.address}
    </li>
    <li>
      <b>Комментарий:</b> ${msg.comment}
    </li>
  </ul>

  <h3>Товары:</h3>
    <ul>
      ${clearItems}
    </ul>
  `;
  }

  return message;
};

const contactMessage = (msg, tg) => {
  let message = '';

  if (tg) {
    message += `<b>Новое сообщение</b>\n`;
    message += `<b>Имя:</b> ${msg.name}\n`;
    message += `<b>Почта:</b> ${msg.email}\n`;
    message += `<b>Комментарий:</b> ${msg.comment}\n`;
  } else {
    message = `<h2>Сообщение</h2>

  <ul>
    <li>
      <b>Имя:</b> ${msg.name}
    </li>
    <li>
      <b>Почта:</b> ${msg.email}
    </li>
    <li>
      <b>Комментарий:</b> ${msg.comment}
    </li>
  </ul>
  `;
  }

  return message;
};

router.post('/submit/:target', async (req, res) => {
  try {
    let sendMessageTg, sendMessageEmail, mailOptions;

    if (req.params.target === '1') {
      sendMessageTg = clearMessage(req.body, true);
      sendMessageEmail = clearMessage(req.body, false);

      mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'Новый заказ!',
        html: sendMessageEmail,
      };
    }

    if (req.params.target === '2') {
      sendMessageTg = contactMessage(req.body, true);
      sendMessageEmail = contactMessage(req.body, false);

      mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'Сообщение от пользователя!',
        html: sendMessageEmail,
      };
    }

    if (sendMessageTg && sendMessageEmail) {
      bot.sendMessage(CHAT_ID, sendMessageTg, { parse_mode: 'HTML' });

      transporter.sendMail(mailOptions);
    }
    sendMessageTg = '';
    sendMessageEmail = '';
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server error' });
  }
});

module.exports = router;
