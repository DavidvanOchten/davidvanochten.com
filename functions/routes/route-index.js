const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', (req, resp) => {
  resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  axios.get('https://davidvanochten-admin.firebaseio.com/.json')
    .then(response => response.data)
    .then((siteData) => {
      return resp.render('pages/index', {
        view: 'index',
        title: siteData.home.title,
        description: siteData.home.description,
        aboutHeadline: siteData.home.aboutHeadline,
        aboutLink: siteData.home.aboutLink,
        workHeadline: siteData.home.workHeadline,
        workLink: siteData.home.workLink,
        latestCases: Object.keys(siteData.cases).map(i => siteData.cases[i]).reverse().slice(0, siteData.home.workItems),
        latestNotes: Object.keys(siteData.notes).map(i => siteData.notes[i]).reverse().slice(0, 3)
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
