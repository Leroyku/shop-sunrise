const Router = require('express');
const router = new Router();
const mysql = require('mysql2/promise');

require('dotenv').config();

const pool = mysql.createPool({
  socketPath: '/var/run/mysqld/mysqld.sock',
  user: process.env.MYSQL_STATIC_USER,
  password: process.env.MYSQL_STATIC_PASS,
  database: process.env.MYSQL_STATIC_DATABASE,
});

function formatColumnName(columnName) {
  const words = columnName.split('_');
  const formattedWords = words.map((word, index) => {
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return word.toLowerCase();
    }
  });
  return formattedWords.join(' ');
}

router.get('/sorts', async (req, res) => {
  const tableName =
    req.query.table === '1. Все товары' ? req.query.table : req.query.table.toUpperCase();

  if (!tableName) {
    return res.status(400).send({ message: 'Invalid parameters' });
  }

  const query = `SELECT COLUMN_NAME
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_NAME = '${tableName}'`;

  try {
    const connection = await pool.getConnection();

    const result = await connection.query(query);

    const columnNames = result[0].map((row) => row.COLUMN_NAME);

    const cyrillicColumns = columnNames.filter((columnName) => /[\u0400-\u04FF]/.test(columnName));

    if (cyrillicColumns.length > 0) {
      const values = {
        Остаток: ['В наличии'],
      };

      for (const columnName of cyrillicColumns) {
        const query = `SELECT DISTINCT \`${columnName}\` FROM \`${tableName}\` WHERE \`${columnName}\` IS NOT NULL ORDER BY \`${columnName}\``;
        const [result] = await connection.query(query);

        values[formatColumnName(columnName)] = result.map((row) => row[columnName]);
      }

      connection.release();
      res.send(values);
    } else {
      connection.release();
      res.send({
        Остаток: ['В наличии'],
      });
    }
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server error' });
  }
});

module.exports = router;
