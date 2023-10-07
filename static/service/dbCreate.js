const mysql = require('mysql2');
const fillDatabase = require('./dbItemsUpdate');

function connectAndCheckTable(filteredArrays, callback) {
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

    function createTableAndColumns(category) {
      if (category === 'АКЦИИ') return;
      const firstItem = filteredArrays[category][0];
      let concatenatedSorts = '';
      for (let i = 1; i < filteredArrays[category].length; i++) {
        const item = filteredArrays[category][i];
        if (item.sorts) {
          concatenatedSorts += '\n' + item.sorts;
        }
      }
      if (!firstItem.sorts) {
        firstItem.sorts = concatenatedSorts;
      } else {
        firstItem.sorts += '\n' + concatenatedSorts;
      }
      const columnsFromSorts = extractColumnsFromSorts(firstItem.sorts);

      const columns = Object.keys(firstItem)
        .filter((key) => key !== 'sorts')
        .map((column) => column.toLowerCase())
        .concat(columnsFromSorts.map((column) => column.toLowerCase().replace(/ /g, '_')));

      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS \`${category}\` (
        ${columns
          .map((column) => {
            const columnName = column.toLowerCase();
            return `\`${columnName}\` TEXT`;
          })
          .join(',\n')}
    )
`;

      connection.query(createTableQuery, (err) => {
        if (err) {
          console.error('Ошибка при создании таблицы. Возможно название:', category);
          console.error(err);
          callback(err);
        } else {
          continueWithColumnAlterations(category);
        }
      });
    }

    function continueWithColumnAlterations(category) {
      const existingColumnsQuery = `SHOW COLUMNS FROM \`${category}\``;

      connection.query(existingColumnsQuery, (err, results) => {
        if (err) {
          console.error('Ошибка при получении столбцов таблицы');
          callback(err);
        } else {
          const existingColumns = results.map((row) => row.Field);
          const firstItem = filteredArrays[category][0];
          let concatenatedSorts = '';
          for (let i = 1; i < filteredArrays[category].length; i++) {
            const item = filteredArrays[category][i];
            if (item.sorts) {
              concatenatedSorts += '\n' + item.sorts;
            }
          }
          if (!firstItem.sorts) {
            firstItem.sorts = concatenatedSorts;
          } else {
            firstItem.sorts += '\n' + concatenatedSorts;
          }

          const columnsFromSorts = extractColumnsFromSorts(firstItem.sorts);
          const columns = Object.keys(firstItem)
            .filter((key) => key !== 'sorts')
            .map((column) => column.toLowerCase())
            .concat(columnsFromSorts.map((column) => column.toLowerCase().replace(/ /g, '_')));

          const newColumns = columns.filter(
            (column) => !existingColumns.includes(column.toLowerCase()),
          );

          if (newColumns.length > 0) {
            const alterTableQuery = `
                ALTER TABLE \`${category}\`
                ${newColumns
                  .map((column) => `ADD COLUMN \`${column.toLowerCase()}\` TEXT`)
                  .join(',\n')}
              `;

            connection.query(alterTableQuery, (err) => {
              if (err) {
                console.error('Ошибка при добавлении столбцов');
                callback(err);
              } else {
                continueWithColumnRemoval(category);
              }
            });
          } else {
            continueWithColumnRemoval(category);
          }
        }
      });
    }

    function continueWithColumnRemoval(category) {
      const existingColumnsQuery = `SHOW COLUMNS FROM \`${category}\``;

      connection.query(existingColumnsQuery, (err, results) => {
        if (err) {
          console.error('Ошибка при получении столбцов таблицы');
          callback(err);
        } else {
          const existingColumns = results.map((row) => row.Field);
          const firstItem = filteredArrays[category][0];
          let concatenatedSorts = '';
          for (let i = 1; i < filteredArrays[category].length; i++) {
            const item = filteredArrays[category][i];
            if (item.sorts) {
              concatenatedSorts += '\n' + item.sorts;
            }
          }
          if (!firstItem.sorts) {
            firstItem.sorts = concatenatedSorts;
          } else {
            firstItem.sorts += '\n' + concatenatedSorts;
          }
          const columnsFromSorts = extractColumnsFromSorts(firstItem.sorts);
          const columns = Object.keys(firstItem)
            .filter((key) => key !== 'sorts')
            .map((column) => column.toLowerCase())
            .concat(columnsFromSorts.map((column) => column.toLowerCase().replace(/ /g, '_')));

          // Remove columns that are not in 'columns'
          const columnsToRemove = existingColumns.filter(
            (column) => !columns.includes(column.toLowerCase()),
          );

          if (columnsToRemove.length > 0) {
            const alterTableQuery = `
                ALTER TABLE \`${category}\`
                DROP COLUMN \`${columnsToRemove.join(', ')}\`
              `;

            connection.query(alterTableQuery, (err) => {
              if (err) {
                console.error('Ошибка при удалении столбцов');
                callback(err);
              } else {
                processedCategories++;

                if (processedCategories === categories.length) {
                  connection.end();
                  callback(null);
                }
              }
            });
          } else {
            processedCategories++;

            if (processedCategories === categories.length) {
              connection.end();
              callback(null);
            }
          }
        }
      });
    }

    categories.forEach((category) => {
      createTableAndColumns(category);
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
      if (!columns.includes(columnName)) {
        columns.push(columnName);
      }
    }
  }
  return columns;
}

function filterArrayByCategory(inputArray) {
  const filteredArrays = {};

  inputArray.forEach((item) => {
    const category = item.category;
    if (!filteredArrays[category]) {
      filteredArrays[category] = [];
    }
    filteredArrays[category].push(item);
  });

  connectAndCheckTable(filteredArrays, (err) => {
    if (err) {
      console.error(`Ошибка при работе с таблицей.`);
    }
  });

  fillDatabase(filteredArrays, (err) => {
    if (err) {
      console.error('Произошла ошибка:', err);
    } else {
      console.log('Данные успешно добавлены в базу данных');
    }
  });

  return filteredArrays;
}

module.exports = filterArrayByCategory;
