
//server.js
const express = require('express');
const path = require('path');
const port = 8080 || 80;
const app = express();

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), (err) => {
    if (err) {
      res.status(500).send(lerr)
    }
  })
});

app.listen(port);

