const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', (req, resp) => {
  resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  axios.get('https://vue-admin.firebaseio.com/.json')
    .then(response => response.data)
    .then((siteData) => {
      return resp.render('pages/index', {
        title: siteData.pages.index.title,
        aboutHeadline: siteData.pages.index.aboutHeadline,
        view: 'index',
        latestCases: Object.keys(siteData.cases).map(i => siteData.cases[i]).reverse().slice(0, 3),
        latestPosts: Object.keys(siteData.posts).map(i => siteData.posts[i]).reverse().slice(0, 3)
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
