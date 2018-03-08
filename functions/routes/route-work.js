const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/work', (req, resp) => {
  resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  // How to attach the cases to the work JSON file?
  // Or do two separate fetch requests (work and cases)?
  axios.get('https://vue-admin.firebaseio.com/cases.json')
    .then((response) => {
      const cases = Object.keys(response.data).map(i => response.data[i]).reverse();

      return resp.render('pages/work', { 
        title: 'Get from admin',
        view: 'work',
        cases
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/work/:id', (req, resp) => {
  resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');

  axios.get('https://vue-admin.firebaseio.com/cases.json')
    .then((response) => {
      const caseObj = Object.keys(response.data).map(i => response.data[i]).filter(obj => obj.path === req.params.id)[0];

      return resp.render('pages/case', { 
        title: caseObj.title,
        headline: caseObj.headline,
        thumbnail: caseObj.thumbnailUrl,
        view: 'case'
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
