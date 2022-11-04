const Router = require('express');
const router = new Router();

const { VK } = require('vk-io');
const config = require('config');
require('dotenv').config();

const vk = new VK({
  token: process.env.TOKEN_VK,
});

const pathLocation = [
  { value: 'Пиротехника', href: '/pyrotechnics', group: 2 },
  { href: '/balls', group: 1 },
  { href: '/gas', group: 5 },
  { href: '/tuning', group: 10 },
  { href: '/equipment', group: 7 },
  { href: '/protection', group: 9 },
  { href: '/magazines', group: 6 },
  { href: '/battery', group: 3 },
  { href: '/sparepart', group: 11 },
];

const fullResponse = [];
const filterResponse = (object) => {
  object.items.map(async (item) => {
    let ref;
    pathLocation.map((loc) => {
      if (loc.group === item.albums_ids[0]) ref = `catalog${loc.href}/${item.id}`;
    });
    item = {
      id: ref,
      name: item.title,
      image: item.thumb_photo,
    };
    fullResponse.push(item);
  });
  return fullResponse;
};

router.get('/search/:q', async (req, res) => {
  try {
    // owner_id: -208008042,
    const items = await vk.api.market.search({
      owner_id: -200949156,
      q: req.params.q,
      extended: 1,
    });
    fullResponse.length = 0;

    filterResponse(items);

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
