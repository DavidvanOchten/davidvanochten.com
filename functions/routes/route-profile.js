const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/profile', (req, resp) => {
  resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  axios.get('https://vue-admin.firebaseio.com/pages/about.json')
    .then((response) => {
      // const skills = Object.keys(response.data).map(i => response.data[i]).reverse();

      return resp.render('pages/profile', {
        canonical: req.originalUrl,
        view: 'profile',
        title: 'profile',
        description: 'test',
        headline: response.data.headline,
        // skills
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
