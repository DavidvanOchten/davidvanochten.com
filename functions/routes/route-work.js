const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/work', (req, resp) => {
  resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  axios.get('https://davidvanochten-admin.firebaseio.com/cases.json')
    .then((response) => {
      const cases = Object.keys(response.data).map(i => response.data[i]);
      cases.sort((a, b) => a.order - b.order);

      return resp.render('pages/work', { 
        view: 'work',
        title: 'Get from admin',
        description: 'test',
        cases
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/work/:id', (req, resp) => {
  resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');

  axios.get('https://davidvanochten-admin.firebaseio.com/cases.json')
    .then((response) => {
      const caseObj = Object.keys(response.data).map(i => response.data[i]).filter(obj => obj.path === req.params.id)[0];

      return resp.render('pages/case', {
        view: 'case',
        title: caseObj.title,
        description: 'test',
        name: caseObj.name,
        headline: caseObj.headline,
        hero: caseObj.heroUrl,
        summary: caseObj.summary,
        // Add file extension in object. If statements inside views (e.g. if video, else if svg, else jpg/png etc)
        content: caseObj.content
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
