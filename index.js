const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const axios = require('axios');


app.use(bodyParser.json());
app.use(cors());

const WEB_API = 'http://192.168.196.118:8000/votingAPI';

app.get('/candidates', (_, res) => {
    axios.get(WEB_API + '/candidates/')
         .then(resp => {
             res.send(resp.data);
         })
         .catch(err => {
             console.log('Error: ' + err);
             res.send({ 'error': err }).status(504);
         })
});

app.post('/votes', (req, res) => {
    if (req.body.candidate_id)
        axios.post(WEB_API + '/tally/', {
            candidate: req.body.candidate_id,
        }).then(resp => {
            res.send(resp.data).status(201);
        }).catch(err => {
            console.log('Error: ' + err)
            res.send({ 'error': err }).status(504);
        });
    else
        res.send({ 'error': 'Unexpected request body.' })
           .status(422);
});

app.listen(3000, '0.0.0.0', () => {
    console.log('listening on port 3000');
});
