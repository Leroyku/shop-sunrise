const Router = require('express');
const https = require('https');

const router = new Router();
const TelegramBot = require('node-telegram-bot-api');
const nodemailer = require('nodemailer');

const config = require('config');
require('dotenv').config();

const TOKEN = process.env.TOKEN_TG;
const CHAT_ID = process.env.CHAT_ID;
const bot = new TelegramBot(TOKEN, { polling: true });

const transporter = nodemailer.createTransport({
  host: 'mail.netangels.ru',
  port: 25,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

function formatPhoneNumber(phoneNumber) {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/);
  if (match) {
    return `+${match[1]}-${match[2]}-${match[3]}-${match[4]}-${match[5]}`;
  }
  return phoneNumber;
}

const clearMessage = (msg, tg) => {
  let clearItems = `${msg.items.map((item) =>
    tg
      ? `${item.name} (${item.count} шт.)
`
      : `<li>${item.name} (${item.count} шт.)</li>`,
  )}`;

  clearItems = clearItems.replaceAll(',', '');

  const telephone = formatPhoneNumber(msg.tel);

  let message = '';

  if (tg) {
    message += `<b>Новый заказ на сумму: ${msg.price} рублей </b> \n`;
    message += `<b>Имя:</b> ${msg.name}\n`;
    message += `<b>Почта:</b> ${msg.email}\n`;
    message += `<b>Телефон:</b> ${telephone}\n`;
    message += `<b>Вид доставки:</b> ${msg.delivery}\n`;
    if (msg.address) message += `<b>Адрес:</b> ${msg.address}\n`;
    if (msg.promocode) message += `${msg.promocode}\n`;
    if (msg.comment) message += `<b>Комментарий:</b> ${msg.comment}\n`;
    message += `<b>Товары:</b>\n`;
    message += clearItems;
  } else {
    message = '<ul>';

    if (msg.name) {
      message += `<li><b>Имя:</b> ${msg.name}</li>`;
    }
    if (msg.email) {
      message += `<li><b>Почта:</b> ${msg.email}</li>`;
    }
    if (telephone) {
      message += `<li><b>Телефон:</b> ${telephone}</li>`;
    }
    if (msg.delivery) {
      message += `<li><b>Вид доставки:</b> ${msg.delivery}</li>`;
    }
    if (msg.address) {
      message += `<li><b>Адрес:</b> ${msg.address}</li>`;
    }
    if (msg.promocode) {
      message += `<li>${msg.promocode}</li>`;
    }
    if (msg.comment) {
      message += `<li><b>Комментарий:</b> ${msg.comment}</li>`;
    }

    message += '</ul>';

    message += '<h3>Товары:</h3>';
    message += '<ul>';
    message += clearItems;
    message += '</ul>';
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
        to: process.env.TOEMAIL,
        subject: 'Новый заказ!',
        html: sendMessageEmail,
      };
    }

    if (req.params.target === '2') {
      sendMessageTg = contactMessage(req.body, true);
      sendMessageEmail = contactMessage(req.body, false);

      mailOptions = {
        from: process.env.EMAIL,
        to: process.env.TOEMAIL,
        subject: 'Сообщение от пользователя!',
        html: sendMessageEmail,
      };
    }

    if (sendMessageTg && sendMessageEmail) {
      bot.sendMessage(CHAT_ID, sendMessageTg, { parse_mode: 'HTML' });

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Ошибка отправки письма:', error);
        } else {
          console.log('Письмо успешно отправлено:', info.response);
        }
      });
    }
    sendMessageTg = '';
    sendMessageEmail = '';
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server error' });
  }
});

module.exports = router;
