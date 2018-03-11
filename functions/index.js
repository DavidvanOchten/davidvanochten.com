const functions = require('firebase-functions');
const express = require('express');
const hbs = require('express-handlebars');
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

app.use(require(path.join(__dirname, '/routes/route-index')));
app.use(require(path.join(__dirname, '/routes/route-work')));
app.use(require(path.join(__dirname, '/routes/route-notes')));
app.use(require(path.join(__dirname, '/routes/route-about')));
app.use(require(path.join(__dirname, '/routes/route-contact')));

exports.app = functions.https.onRequest(app);
