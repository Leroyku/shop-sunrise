const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const axios = require('axios');
require('dotenv').config();

const pool = mysql.createPool({
  socketPath: '/var/run/mysqld/mysqld.sock',
  user: process.env.MYSQL_STATIC_USER,
  password: process.env.MYSQL_STATIC_PASS,
  database: process.env.MYSQL_STATIC_DATABASE,
});

async function getRemoteImagesArray(item) {
  try {
    const response = await axios.get(
      `https://static.sunrise.na4u.ru/api/images/${item.product_id}`,
    );
    if (response.status === 200 && Array.isArray(response.data)) {
      const photoUrls = response.data;
      return photoUrls;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

function generateSQLSorting(inputString) {
  if (inputString === 'price-asc') return `ORDER BY CAST(price AS DECIMAL) ASC`;
  if (inputString === 'price-desc') return `ORDER BY CAST(price AS DECIMAL) DESC`;
  if (inputString === 'alphabetical') return `ORDER BY name ASC`;
  if (inputString === 'newest') return `ORDER BY updated DESC`;
}
function generateSQLQuery(inputString, allItems) {
  const conditions = inputString.split(';');
  const sqlConditions = [];
  let orConditions = [];
  let sortings = [];

  for (let condition of conditions) {
    const trimmedCondition = condition.trim();
    if (trimmedCondition === '') {
      continue;
    }
    const [key, value] = trimmedCondition.split('=').map((item) => item.trim());

    if (value.includes(',')) {
      const valueArr = value.split(',');
      let str = '(';
      valueArr.forEach((item, index) => {
        if (index != valueArr.length - 1) {
          str += `\`${key}\` = '${item}' OR `;
        }
        if (index === valueArr.length - 1) {
          str += `\`${key}\` = '${item}')`;
        }
      });
      orConditions.push(`${str}`);
    } else {
      if (key != 'sort') {
        if (key != 'остаток') orConditions.push(`\`${key}\` = '${value}'`);
        if (key === 'остаток') orConditions.push(`stock > 0`);
      }
    }
  }

  if (orConditions.length > 0) {
    sqlConditions.push(`${orConditions.join(' AND ')}`);
  }

  if (sqlConditions.length > 0) {
    if (allItems) return ` and ${sqlConditions}`;
    return `WHERE price > 0 and ${sqlConditions}`;
  }
  if (allItems) return ``;
  return `WHERE price > 0`;
}

router.get('/data', async (req, res) => {
  const tableName =
    req.query.table === '1. Все товары' ? req.query.table : req.query.table.toUpperCase();
  const page = parseInt(req.query.page);
  const slider = req.query.slider === 'true';
  const search = req.query.search;
  const searchPanel = req.query.searchPanel === 'true';
  const id = req.query.id;
  const filter = req.query.filter;
  const sorting = req.query.sorting;

  if (!tableName) {
    return res.status(400).send({ message: 'Invalid parameters' });
  }

  let query;
  let countQuery;

  let countResult, totalItems;
  try {
    const itemsPerPage = 12;
    const offset = (page - 1) * itemsPerPage;

    if (page > 0 && !search) {
      query = `
          SELECT *
          FROM \`${tableName}\`
          ${generateSQLQuery(filter, false)}
          ${generateSQLSorting(sorting)}
          LIMIT ${itemsPerPage}
          OFFSET ${offset};
        `;

      countQuery = `
            SELECT COUNT(*) AS total
            FROM \`${tableName}\`
            WHERE price > 0${generateSQLQuery(filter, true)};
          `;
    }
    if (slider) {
      query = `SELECT *
      FROM \`${tableName}\`
      WHERE price > 0 AND stock > 0
      ${tableName === '1. Все товары' ? `ORDER BY updated DESC` : ''}
      LIMIT 9;`;
    }
    if (search) {
      if (searchPanel) {
        query = query = `
      SELECT *
      FROM \`1. Все товары\`
      WHERE name LIKE '%${search}%' AND price > 0
      LIMIT 5;
    `;
      }
      if (!searchPanel) {
        query = query = `
      SELECT *
      FROM \`1. Все товары\`
      WHERE name LIKE '%${search}%' AND price > 0
      LIMIT ${itemsPerPage}
      OFFSET ${offset};
    `;

        countQuery = `
          SELECT COUNT(*) AS total
          FROM \`1. Все товары\`
          WHERE name LIKE '%${search}%' AND price > 0;
        `;
      }
    }
    if (id) {
      query = `
    SELECT *
    FROM \`${tableName}\`
    WHERE product_id = ${id}
    LIMIT 1;
    `;
    }
    const connection = await pool.getConnection();
    await connection.query(`USE ${process.env.MYSQL_STATIC_DATABASE}`);

    if (countQuery) {
      [countResult] = await connection.query(countQuery);
      totalItems = countResult[0].total;
    }

    const [result] = await connection.query(query);

    if (result.length === 0) {
      connection.release();
      if (totalItems) {
        res.send({ total: totalItems, items: [] });
      } else {
        res.send([]);
      }
      return;
    }

    const fullResponse = await Promise.all(
      result.map(async (item) => {
        if (item.product_id) {
          const photoUrls = await getRemoteImagesArray(item);
          return {
            id: item.product_id,
            name: item.name,
            price: parseInt(item.price),
            description: item.description,
            stock: parseInt(item.stock),
            images: photoUrls.reverse(),
            video: item.video,
            category: item.category,
            categorylink: item.categorylink,
            meta: item.meta ? item.meta : item.meta,
            ...(id ? { ...item } : {}),
          };
        }
        return item;
      }),
    );

    connection.release();
    if (totalItems) res.send({ total: totalItems, items: fullResponse });
    if (!totalItems) res.send(fullResponse);
  } catch (err) {
    console.error('Error:', err);
    if (totalItems) {
      res.send({ total: totalItems, items: [] });
    } else {
      res.send([]);
    }
  }
});

module.exports = router;
