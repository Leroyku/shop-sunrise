const mysql = require('mysql2');

function fillDatabase(filteredArrays, callback) {
  const connection = mysql.createConnection({
    socketPath: '/var/run/mysqld/mysqld.sock',
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
  });
  // const connection = mysql.createConnection({
  //   database: 'sunrise',
  //   user: 'root',
  //   password: '',
  // });

  connection.connect((err) => {
    if (err) {
      console.error('Ошибка подключения:', err);
      callback(err);
      return;
    }

    console.log('Успешное подключение к MySQL серверу');

    const categories = Object.keys(filteredArrays);
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
        const columnsFromSorts = extractColumnsFromSorts(currentItem.sorts);
        const columns = Object.keys(currentItem)
          .filter((key) => key !== 'sorts')
          .map((column) => column.toLowerCase())
          .concat(columnsFromSorts.map((column) => column.toLowerCase().replace(/ /g, '_')));

        const newItem = { ...currentItem };
        const lines = currentItem.sorts.split('\n');
        const keyValuePairs = lines.map((line) => line.split(':').map((item) => item.trim()));
        const properties = {};
        keyValuePairs.forEach((pair) => {
          if (pair.length === 2) {
            const key = pair[0].toLowerCase().replace(/ /g, '_');
            const value = pair[1];
            properties[key] = value;
          }
        });
        Object.assign(newItem, properties);
        delete newItem.sorts;

        const query = `SELECT * FROM \`${category}\` WHERE product_id = ?`;
        connection.query(query, [newItem.product_id], (err, results) => {
          if (err) {
            console.error(`Ошибка при проверке существования записи в таблице ${category}:`, err);
            processNextItem(index + 1);
          } else {
            if (results.length > 0) {
              // Запись с таким product_id уже существует, выполним обновление
              const updateColumns = columns.map((col) => `\`${col}\` = ?`).join(', ');
              const updateQuery = `UPDATE \`${category}\` SET ${updateColumns} WHERE product_id = ?`;
              const updateData = columns.map((col) => newItem[col]).concat(newItem.product_id);

              connection.query(updateQuery, updateData, (err, updateResults) => {
                if (err) {
                  // console.error(`Ошибка при обновлении данных в таблице ${category}:`, err);
                } else {
                  // console.log(`Данные успешно обновлены в таблице ${category}`);
                }
                processNextItem(index + 1);
              });
            } else {
              // Записи с таким product_id нет, выполним вставку
              const insertColumns = columns.map((col) => `\`${col}\``).join(', ');
              const insertValuesPlaceholder = `(${columns.map(() => '?').join(', ')})`;
              const insertQuery = `INSERT INTO \`${category}\` (${insertColumns}) VALUES ${insertValuesPlaceholder}`;
              const insertData = columns.map((col) => newItem[col]);

              connection.query(insertQuery, insertData, (err, insertResults) => {
                if (err) {
                  // console.error(`Ошибка при вставке данных в таблицу ${category}:`, err);
                } else {
                  // console.log(`Данные успешно вставлены в таблицу ${category}`);
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
      if (category != 'АКЦИИ' && category != '') insertDataIntoTable(category);
    });
  });
}

function extractColumnsFromSorts(sorts) {
  const lines = sorts.split('\n');
  const columns = [];
  for (const line of lines) {
    const parts = line.split(':');
    if (parts.length > 1) {
      const columnName = parts[0].trim();
      columns.push(columnName);
    }
  }
  return columns;
}

module.exports = fillDatabase;
