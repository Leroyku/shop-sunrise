const mysql = require('mysql2');

function fillFullDatabase(filteredArrays, callback) {
  const connection = mysql.createConnection({
    socketPath: '/var/run/mysqld/mysqld.sock',
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
  });
  //   const connection = mysql.createConnection({
  //     database: 'sunrise',
  //     user: 'root',
  //     password: '',
  //   });
  //   console.log(filteredArrays);

  connection.connect((err) => {
    if (err) {
      console.error('Ошибка подключения:', err);
      callback(err);
      return;
    }

    console.log('Успешное подключение к MySQL серверу');
    // createFullTableAndColumns(filteredArrays);
    const categories = Object.keys(filteredArrays);
    // console.log(categories);
    let processedCategories = 0;

    function insertDataIntoTable(category) {
      const items = filteredArrays[category];
      if (items.length === 0) {
        processedCategories++;
        checkCompletion();
        return;
      }

      function processNextItem(index) {
        if (index >= items.length) {
          processedCategories++;
          checkCompletion();
          return;
        }

        const currentItem = items[index];
        const columns = Object.keys(currentItem)
          .filter((key) => key !== 'sorts')
          .map((column) => column.toLowerCase());

        const newItem = { ...currentItem };

        Object.assign(newItem);
        delete newItem.sorts;

        const query = `SELECT * FROM \`1. Все товары\` WHERE product_id = ?`;
        connection.query(query, [newItem.product_id], (err, results) => {
          if (err) {
            console.error(`Ошибка при проверке существования записи в таблице Все товары:`, err);
            processNextItem(index + 1);
          } else {
            if (results.length > 0) {
              // Запись с таким product_id уже существует, выполним обновление
              const updateColumns = columns.map((col) => `\`${col}\` = ?`).join(', ');
              const updateQuery = `UPDATE \`1. Все товары\` SET ${updateColumns} WHERE product_id = ?`;
              const updateData = columns.map((col) => newItem[col]).concat(newItem.product_id);

              connection.query(updateQuery, updateData, (err, updateResults) => {
                if (err) {
                  // console.error(`Ошибка при обновлении данных в таблице ${category}:`, err);
                } else {
                  console.log(`Данные успешно обновлены в таблице ${category}`);
                }
                processNextItem(index + 1);
              });
            } else {
              // Записи с таким product_id нет, выполним вставку
              const insertColumns = columns.map((col) => `\`${col}\``).join(', ');
              const insertValuesPlaceholder = `(${columns.map(() => '?').join(', ')})`;
              const insertQuery = `INSERT INTO \`1. Все товары\` (${insertColumns}) VALUES ${insertValuesPlaceholder}`;
              const insertData = columns.map((col) => newItem[col]);

              connection.query(insertQuery, insertData, (err, insertResults) => {
                if (err) {
                  // console.error(`Ошибка при вставке данных в таблицу ${category}:`, err);
                } else {
                  console.log(`Данные успешно вставлены в таблицу ${category}`);
                }
                processNextItem(index + 1);
              });
            }
          }
        });
      }

      processNextItem(0);
    }

    function checkCompletion() {
      if (processedCategories === categories.length) {
        connection.end();
        callback(null);
      }
    }

    categories.forEach((category) => {
      if (category != 'АКЦИИ') insertDataIntoTable(category);
    });
  });
}

function createFullTableAndColumns(filteredArrays, callback) {
  const connection = mysql.createConnection({
    socketPath: '/var/run/mysqld/mysqld.sock',
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
  });
  const firstItem = filteredArrays['ПИРОТЕХНИКА'][0];
  connection.connect((err) => {
    if (err) {
      console.error('Ошибка подключения:', err);
      callback(err);
      return;
    }
    const columns = Object.keys(firstItem)
      .filter((key) => key !== 'sorts')
      .map((column) => column.toLowerCase());

    const createTableQuery = `
              CREATE TABLE IF NOT EXISTS \`1. Все товары\` (
                id INT AUTO_INCREMENT PRIMARY KEY,
                ${columns
                  .map((column) => {
                    const columnName = column.toLowerCase();
                    return `${columnName} TEXT`;
                  })
                  .join(',\n')}
              )
            `;

    connection.query(createTableQuery, (err) => {
      if (err) {
        console.error('Ошибка при создании таблицы. 1. Все товары');
        callback(err);
      }
    });
  });
}

function fullDB(inputArray) {
  const filteredArrays = {};

  inputArray.forEach((item) => {
    const category = item.category;
    if (!filteredArrays[category]) {
      filteredArrays[category] = [];
    }
    filteredArrays[category].push(item);
  });

  createFullTableAndColumns(filteredArrays, (err) => {
    if (err) {
      console.error(`Ошибка при работе с таблицей.`);
    }
  });

  fillFullDatabase(filteredArrays, (err) => {
    if (err) {
      console.error('Произошла ошибка:', err);
    } else {
      console.log('Данные успешно добавлены в базу данных');
    }
  });

  return filteredArrays;
}

module.exports = fullDB;
