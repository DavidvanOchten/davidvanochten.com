const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', (req, resp) => {
  resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  // TODO: Fetch work only
  axios.get('https://davidvanochten-admin.firebaseio.com/.json')
    .then(response => response.data)
    .then((data) => {
      const projects = Object.keys(data.cases).map(i => data.cases[i]);
      projects.sort((a, b) => a.order - b.order);

      return resp.render('pages/index', {
        canonical: req.originalUrl,
        view: 'index',
        title: 'Selected work',
        description: data.home.description,
        projects: projects.slice(0, data.home.workItems)
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
