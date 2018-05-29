const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');
const admin = require('firebase-admin');
const { check, validationResult } = require('express-validator/check');

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
        headline: 'Get in touch',
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post('/contact', [
    check('name')
      .isLength({ min: 1 })
      .withMessage('https://media.giphy.com/media/JkvIxlfyRZPMI/giphy.gif'),
    check('email')
      .isEmail()
      .withMessage('https://media.giphy.com/media/12Up26fqbaU45W/giphy.gif')
  ], (req, resp) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return resp.status(422).json({ errors: errors.array() });
  }

  const data = req.body;

  return admin.database().ref('messages').push({
    name: data.name,
    email: data.email,
    message: data.message
  }, (err) => {
    if (err) {
      resp.status(500).send('Something went wrong.');
    } else {
      resp.status(200).send('Form submitted.');
    }
  });
});

module.exports = router;
