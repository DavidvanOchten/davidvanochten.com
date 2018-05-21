const functions = require('firebase-functions');
const express = require('express');
const hbs = require('express-handlebars');
const favicon = require('serve-favicon');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app =  express();
app.engine('hbs', hbs({
  extname: 'hbs', 
  defaultLayout: 'base', 
  layoutDir: path.join(__dirname, '/views/layouts'),
  partialsDir: [ path.join(__dirname, '/views/partials') ]
}));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, '/favicon.ico')));
app.use(cors({
  origin: true
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(require(path.join(__dirname, '/routes/route-index')));
app.use(require(path.join(__dirname, '/routes/route-work')));
app.use(require(path.join(__dirname, '/routes/route-notes')));
app.use(require(path.join(__dirname, '/routes/route-profile')));
app.use(require(path.join(__dirname, '/routes/route-contact')));
app.use(require(path.join(__dirname, '/routes/route-offline')));

app.use((req, res, next) => {
  res.status(404).render('pages/error', { 
    title: 'Page not found',
    description: '404 - Page not found',
    view: 'error'
  });
});

exports.app = functions.https.onRequest(app);

exports.onFormSubmit = functions.database.ref('messages').onWrite((data, context) => {
  // TODO: Send email after submit
  // https://firebase.google.com/docs/functions/beta-v1-diff
  console.log(data, context);
  return;
});
