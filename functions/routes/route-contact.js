const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');
const admin = require('firebase-admin');

admin.initializeApp();

const router = express.Router();

router.get('/contact', (req, resp) => {
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

router.post('/contact', (req, resp) => {
  const data = req.body;
  // Sanitize data
  admin.database().ref('messages').push({
    name: data.name,
    email: data.email,
    message: data.message
  }, (err) => {
    if (err) {
      console.log('Error', err);
      resp.status(500).send('Something went wrong. Check if there are any errors or try again later.');
    } else {
      console.log('Successful submit');
      resp.status(200).send('Ahoy! I got your message. Will get back to you as soon as possible.');
    }
  });
});

module.exports = router;
