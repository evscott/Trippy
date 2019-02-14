'use strict';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./controller/authroutes');
const appRoutes = require('./controller/approutes');
const tripRoutes = require('./controller/triproutes');
const Config = require('./Config');
const port = process.env.PORT || 4201;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.route('/*', (req, res) => {
  res.redirect(__dirname + '/../dist/index.html');
});
app.use(express.static(path.join(__dirname, '/../dist')));
app.use(express.json());
app.use(bodyParser.json());
app.use(Config.AccessControl);
app.use('/app/', appRoutes);
app.use('/', authRoutes);
app.use('/trip/', tripRoutes);
app.listen(port, () => console.log(`Listening on port: ${port}...`));
