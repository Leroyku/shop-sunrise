const Router = require('express');
const router = new Router();
const fs = require('fs');
const path = require('path');

router.get('/images/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    const photoPath = path.join(__dirname, '../images');
    const files = fs.readdirSync(photoPath);

    const photoUrls = files
      .filter((file) => file.includes(productId))
      .map((file) => `https://static.sunrise.na4u.ru/images/${file}`);

    res.status(200).json(photoUrls);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
