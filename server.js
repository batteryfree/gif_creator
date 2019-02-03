/*******server.js******/
const express = require('express');
const port = 8080;
const path = require('path');

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'www')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'www', 'index.html'),(err) => {
        if (err) {
            console.log(err);
        };
        console.log(req.url);
    });
});

app.listen(port, () => {
    console.log(`Server starter, port: ${port}`);
});