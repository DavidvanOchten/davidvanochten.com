const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', (req, resp) => {
  resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  axios.get('https://davidvanochten-admin.firebaseio.com/.json')
    .then(response => response.data)
    .then((siteData) => {
      const projects = Object.keys(siteData.cases).map(i => siteData.cases[i]);
      projects.sort((a, b) => a.order - b.order);

      return resp.render('pages/index', {
        view: 'index',
        title: siteData.home.title,
        description: siteData.home.description,
        aboutHeadline: siteData.home.aboutHeadline,
        aboutLink: siteData.home.aboutLink,
        // workHeadline: siteData.home.workHeadline,
        workLink: siteData.home.workLink,
        notesHeadline: siteData.home.notesHeadline,
        notesLink: siteData.home.notesLink,
        latestProjects: projects.slice(0, siteData.home.workItems),
        latestNotes: Object.keys(siteData.notes).map(i => siteData.notes[i]).reverse().slice(0, 3)
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
