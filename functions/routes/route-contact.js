const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/contact', (req, resp) => {
  // Make this one global?
  resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  axios.get('https://vue-admin.firebaseio.com/pages/contact.json')
    .then((response) => {
      return resp.render('pages/contact', {
        view: 'contact',
        title: 'contact',
        description: 'test',
        headline: 'Contact',
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
