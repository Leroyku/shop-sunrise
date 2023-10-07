const Router = require('express');
const router = new Router();
const mysql = require('mysql2/promise');

require('dotenv').config();

const pool = mysql.createPool({
  socketPath: '/var/run/mysqld/mysqld.sock',
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
});

router.get('/promocodes/:promocode', async (req, res) => {
  const query = `
    SELECT *
    FROM promocodes
    WHERE promocode = '${req.params.promocode}'
    LIMIT 1
  `;

  try {
    const connection = await pool.getConnection();
    await connection.query('USE c73343_sunrise_na4u_ru');
    const [result] = await connection.query(query);

    connection.release();
    if (result.length != 0) {
      const item = {
        id: result[0].id,
        promocode: result[0].promocode,
        value: result[0].value,
        stock: result[0].stock,
      };
      const response = {
        items: [item],
      };
      res.send(response);
    }
    if (result.length === 0) {
      const response = {
        items: [],
      };
      res.send(response);
    }
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server error' });
  }
});

router.post('/prom', async (req, res) => {
  try {
    const promoItem = req.body;

    if (!promoItem || !promoItem.promocode || promoItem.stock === undefined) {
      return res.status(400).send({ message: 'Invalid request data' });
    }

    if (promoItem.stock === 'infinity') {
      return res.send({ message: 'Stock is infinite, no update needed' });
    }

    const updateQuery = `
      UPDATE promocodes
      SET stock = ${promoItem.stock}
      WHERE promocode = '${promoItem.promocode}'
    `;

    const connection = await pool.getConnection();
    await connection.query('USE c73343_sunrise_na4u_ru');
    const [result] = await connection.query(updateQuery);

    connection.release();

    if (result.affectedRows > 0) {
      res.send({ message: 'Stock updated successfully' });
    } else {
      res.send({ message: 'Promocode not found' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
