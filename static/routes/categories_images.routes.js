const Router = require('express');
const router = new Router();
const fs = require('fs');
const path = require('path');

router.get('/categories_images/:categorylink', async (req, res) => {
  const categorylink = req.params.categorylink;

  try {
    const photoPath = path.join(__dirname, '../categories_images');
    const files = fs.readdirSync(photoPath);

    const photoUrls = files
      .filter((file) => file.includes(categorylink))
      .map((file) => `https://static.sunrise.na4u.ru/categories_images/${file}`);

    if (photoUrls.length > 0) {
      const firstPhotoUrl = photoUrls[0];
      res.status(200).json(firstPhotoUrl);
    } else {
      res.status(404).json({ error: 'No matching photos found' });
    }
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
