const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const WEB_API = 'https://jsonplaceholder.typicode.com';

app.get('/candidates', (_, res) => {
    let candidates = [];
    https.get(WEB_API + '/candidates', resp => {
        let data = [];

        resp.on('data', chunk => {
            data.push(chunk);
        });

        resp.on('end', () => {
            candidates = JSON.parse(Buffer.concat(data).toString());
            res.send(candidates);
        });
    }).on('error', err => {
        console.log('Error: ', err.message);
    });
});

app.post('/votes', (req, res) => {
    // something similar for post
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});