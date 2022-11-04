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
      sort: item.property_values ? item.property_values[0].variant_name : '',
      description: item.description,
    };
    fullResponse.push(item);
  });
  return fullResponse;
};

router.get('/item/:id/', async (req, res) => {
  try {
    // item_ids: `-208008042_${req.params.id}`,
    const items = await vk.api.market.getById({
      item_ids: `-200949156_${req.params.id}`,
    });
    fullResponse.length = 0;
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
