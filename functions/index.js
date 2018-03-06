const functions = require('firebase-functions');
const express = require('express');
const hbs = require('express-handlebars');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app =  express();
app.engine('hbs', hbs({
  extname: 'hbs', 
  defaultLayout: 'base', 
  layoutDir: path.join(__dirname, '/views/layouts'),
  partialsDir: [ path.join(__dirname, '/views/partials') ]
}));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');
app.use(cors({
  origin: true
}));

app.get('/', (req, resp) => {
  resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  axios.get('https://vue-admin.firebaseio.com/.json')
    .then(response => response.data)
    .then((siteData) => {
      return resp.render('pages/index', {
        // Add dynamic content from Home admin
        title: 'Portfolio',
        headline: siteData.pages.index.headline,
        view: 'home',
        latestCases: Object.keys(siteData.cases).map(i => siteData.cases[i]).reverse().slice(0, 3),
        latestPosts: Object.keys(siteData.posts).map(i => siteData.posts[i]).reverse().slice(0, 3)
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/offline', (req, resp) => {
  resp.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  resp.render('pages/offline', { 
    title: 'Offline',
    view: 'offline'      
  });
});

app.get('/work', (req, resp) => {
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

exports.app = functions.https.onRequest(app);
