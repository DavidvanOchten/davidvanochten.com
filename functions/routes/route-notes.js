const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/notes', (req, resp) => {
  // Make this one global?
  resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  axios.get('https://vue-admin.firebaseio.com/posts.json')
    .then((response) => {
      const notes = Object.keys(response.data).map(i => response.data[i]).reverse();

      return resp.render('pages/notes', { 
        title: 'Notes',
        description: 'test',
        headline: 'Notes page',
        view: 'notes',
        notes
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
