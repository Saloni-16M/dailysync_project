const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      'https://newsdata.io/api/1/news?apikey=pub_8395915e8555c11d45ee0ca9fe988a2fd52e6&country=in&language=en'
    );

    const articles = response.data.results;

    // Group articles by their source (newspaper)
    const grouped = {};
    articles.forEach(article => {
      const source = article.source_id || 'Unknown Source';
      if (!grouped[source]) {
        grouped[source] = [];
      }
      grouped[source].push({
        title: article.title,
        description: article.description,
        link: article.link
      });
    });

    // Convert to array format for frontend
    const result = Object.keys(grouped).map(source => ({
      name: source,
      articles: grouped[source]
    }));

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;
