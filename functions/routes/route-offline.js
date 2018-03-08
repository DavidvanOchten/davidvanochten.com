const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/offline', (req, resp) => {
  resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  resp.render('pages/offline', { 
    title: 'Offline',
    view: 'offline'
  });
});

module.exports = router;
