const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/about', (req, resp) => {
  // Make this one global?
  resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  axios.get('https://vue-admin.firebaseio.com/pages/about.json')
    .then((response) => {
      // const skills = Object.keys(response.data).map(i => response.data[i]).reverse();

      return resp.render('pages/about', { 
        title: 'About',
        headline: response.data.headline,
        view: 'about'
        // skills
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
