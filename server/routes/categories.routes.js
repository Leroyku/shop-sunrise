const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

require('dotenv').config();

const pool = mysql.createPool({
  socketPath: '/var/run/mysqld/mysqld.sock',
  user: process.env.MYSQL_STATIC_USER,
  password: process.env.MYSQL_STATIC_PASS,
  database: process.env.MYSQL_STATIC_DATABASE,
});

// const pool = mysql.createPool({
//   // socketPath: '/var/run/mysqld/mysqld.sock',
//   user: 'root',
//   password: '',
//   database: 'sunrise',
// });

async function getRemoteImages(categorylink) {
  try {
    const response = await axios.get(
      `https://static.sunrise.na4u.ru/api/categories_images/${categorylink}`,
    );
    if (response.status === 200) {
      const photoUrls = response.data;
      return photoUrls;
    } else {
      return '';
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

router.get('/categories', async (req, res) => {
  const query = `
  SELECT table_name
FROM information_schema.tables
WHERE table_schema = '${process.env.MYSQL_STATIC_DATABASE}';
  `;

  try {
    const connection = await pool.getConnection();
    await connection.query(`USE ${process.env.MYSQL_STATIC_DATABASE}`);
    const [result] = await connection.query(query);

    const categoryLinks = [];

    for (const row of result) {
      const tableName = row.table_name;
      if (tableName != '1. Все товары') {
        const categoryLinkQuery = `SELECT categorylink FROM \`${tableName}\` LIMIT 1`;
        const [categoryLinkResult] = await pool.query(categoryLinkQuery);

        if (categoryLinkResult.length > 0) {
          const categorylink = categoryLinkResult[0].categorylink;
          const photo = await getRemoteImages(categorylink);
          const formattedCategoryName = formatCategoryName(tableName);
          categoryLinks.push({
            category_name: formattedCategoryName,
            category_link: categorylink,
            category_photo: photo,
          });
        }
      }
      function formatCategoryName(categoryName) {
        return categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();
      }
    }
    connection.release();
    res.send(categoryLinks);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
