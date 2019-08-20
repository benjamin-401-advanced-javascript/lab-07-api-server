'use strict';

const express = require('express');

// require('../docs/config/swagger.js');

const app = express();

var categories = require('./categories-routes.js');

app.use('/categories', categories);


app.use('*', (req, res) => {
  res.status(404);
  res.statusMessage = 'These are not the droids you\'re looking for';
  res.json({ error: 'These are not the droids you\'re looking for' });
});

app.use((error, req, res, next) => {
  console.log('We messed up. ¯\\_(ツ)_/¯  We sorry.')
  res.status(500);
  res.statusMessage = 'We messed up. ¯\\_(ツ)_/¯  We sorry.';
  res.json({ error: error });
});

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};

