const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/info', (req, resp) => {
  resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  axios.get('https://davidvanochten-admin.firebaseio.com/info.json')
    .then((response) => {
      // const skills = Object.keys(response.data).map(i => response.data[i]).reverse();

      return resp.render('pages/info', {
        canonical: req.originalUrl,
        view: 'info',
        title: 'Info',
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
