const fs = require('fs');
const fetch = require('node-fetch');
const Moysklad = require('moysklad');
const ms = Moysklad({ fetch });
const config = require('config');
require('dotenv').config();
const transliteration = require('transliteration');
const filterArrayByCategory = require('./dbCreate');
const fillFullDatabase = require('./dbAllItems');

const moyskladResponseVariants = [];
const moyskladResponse = [];
const moyskladR = [];

const imagesPusher = async (item) => {
  try {
    if (item.meta.type != 'variant' && item.paymentItemType != 'SERVICE') {
      const authHeaders = {
        Authorization: `Bearer ${process.env.MOYSKLAD_TOKEN}`,
      };
      // let image;
      let filePath;
      const { rows: images } = await ms.GET(item.images.meta.href.slice(41));

      for (let i = 0; i < images.length; i++) {
        if (i === 0) {
          filePath = `./images/${item.code}.png`;
        } else {
          filePath = `./images/${item.code}(${i}).png`;
        }

        createDownloadFunction(i);
      }
      async function createDownloadFunction(i) {
        try {
          if (images[i] && images[i].meta.downloadHref) {
            await downloadImage(images[i].meta.downloadHref, filePath, authHeaders);
            console.log('Image downloaded successfully');
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const sortItems = async (item) => {
  if (item.meta.type != 'variant' && item.paymentItemType != 'SERVICE') {
    try {
      function findSalePrice(salePrices) {
        const foundSalePrice = salePrices.find((price) => price.priceType.name === 'Цена продажи');
        return foundSalePrice ? foundSalePrice.value : 0;
      }
      function findSortingValue(attributes) {
        const foundSortingAttribute = attributes.find(
          (attribute) => attribute.name === 'Сортировка',
        );
        return foundSortingAttribute ? foundSortingAttribute.value : '';
      }
      function findMetaValue(attributes) {
        const foundSortingAttribute = attributes.find((attribute) => attribute.name === 'Мета');
        return foundSortingAttribute ? foundSortingAttribute.value : '';
      }
      function findVideoValue(attributes) {
        const foundSortingAttribute = attributes.find(
          (attribute) => attribute.name === 'Ссылка на видео',
        );
        return foundSortingAttribute ? foundSortingAttribute.value : '';
      }

      const itemReturn = {
        product_id: item.code,
        name: item.name,
        price: findSalePrice(item.salePrices) / 100,
        description: item.description ? item.description : '',
        category: item.pathName.split('/')[0],
        categorylink: transliteration
          .transliterate(item.pathName.split('/')[0])
          .toLowerCase()
          .replace(/\s/g, '_'),
        stock: item.quantity ? item.quantity : 0,
        video: item.attributes ? findVideoValue(item.attributes) : '',
        updated: item.updated ? item.updated : '',
        meta: item.attributes ? findMetaValue(item.attributes) : '',
        sorts: item.attributes ? findSortingValue(item.attributes) : '',
      };

      moyskladResponse.push(itemReturn);
    } catch (error) {
      console.error(error);
    }
  }
  if (item.meta.type === 'variant') {
    const itemReturn = {
      name: item.name,
      stock: item.quantity ? item.quantity : 0,
      updated: item.updated ? item.updated : '',
    };
    moyskladResponseVariants.push(itemReturn);
  }
};

const moyskladFilter = async (rows) => {
  try {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const processRows = async () => {
      for (const [i, row] of rows.entries()) {
        // await imagesPusher(row);
        await sortItems(row);
        // await delay(2);
      }
    };

    processRows()
      .then(() => {
        console.log('Обработка завершена');
        if (moyskladResponse.length > 0 && moyskladResponseVariants.length > 0) {
          moyskladResponse.forEach((item) => {
            const matchingVariant = moyskladResponseVariants.find((variant) =>
              variant.name.includes(item.name),
            );
            if (matchingVariant) {
              item.stock = matchingVariant.stock;
              item.updated = matchingVariant.updated;
            }
          });
        }

        fillFullDatabase(moyskladResponse);
        filterArrayByCategory(moyskladResponse);
        // insertData();
        moyskladR.length = 0;
        moyskladResponse.length = 0;
        moyskladResponseVariants.length = 0;
      })
      .catch((error) => {
        console.error('Произошла ошибка', error);
      });
  } catch (error) {
    console.error(error);
  }
};

async function downloadImage(url, filePath, authHeaders = {}) {
  return await fetch(url, { headers: authHeaders }).then((res) => {
    res.body.pipe(fs.createWriteStream(filePath));
  });
}

const moyskladGet = async () => {
  try {
    let offset = 0;
    const fetchAndAccumulateData = async () => {
      while (true) {
        const response = await ms.GET('entity/assortment', {
          limit: 500,
          offset: 500 * offset,
        });

        const { rows } = response;
        moyskladR.push(...rows);

        if (rows.length < 500) {
          break;
        }

        offset++;
      }
    };

    await fetchAndAccumulateData();
    moyskladFilter(moyskladR);
  } catch (e) {
    console.log(e);
    callback(e);
  }
};
module.exports = { moyskladGet };
