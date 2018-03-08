const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/news', (req, resp) => {
  // Make this one global?
  resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  axios.get('https://vue-admin.firebaseio.com/posts.json')
    .then((response) => {
      const posts = Object.keys(response.data).map(i => response.data[i]).reverse();

      return resp.render('pages/news', { 
        title: 'News',
        headline: 'News page',
        view: 'news',
        posts
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
