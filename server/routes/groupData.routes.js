const Router = require('express');
const router = new Router();

const { VK } = require('vk-io');
const config = require('config');
require('dotenv').config();

const vk = new VK({
  token: process.env.TOKEN_VK,
});

const fullResponse = [];
const filterResponse = (object) => {
  object.items.map(async (item) => {
    item = {
      id: item.id,
      name: item.title,
      price: item.price.amount / 100,
      old_price: item.price.old_amount / 100,
      stock: item.availability,
      images: item.thumb_photo,
      first_sort: item.property_values
        ? item.property_values[0]
          ? item.property_values[0].variant_name
          : ''
        : '',
      second_sort: item.property_values
        ? item.property_values[1]
          ? item.property_values[1].variant_name
          : ''
        : '',
    };
    fullResponse.push(item);
  });
  return fullResponse;
};

router.get('/group/:id/:offset', async (req, res) => {
  try {
    // owner_id: -208008042,
    const items = await vk.api.market.get({
      owner_id: -200949156,
      album_id: req.params.id,
      count: 9,
      offset: req.params.offset,
    });
    fullResponse.length = 0;
    // console.log(items);
    filterResponse(items);
    // res.send(items);
    const response = {
      items: fullResponse,
    };
    res.send(response);
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server error' });
  }
});

module.exports = router;
