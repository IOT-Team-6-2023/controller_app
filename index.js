const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const WEB_API = 'https://link-to-web-server.com:3000/'

app.get('/candidates', (_, res) => {
    let candidates = []
    axios.get(WEB_API + 'candidtates')
         .then(res => candidates = res.data)
         .catch(err => console.log(err));

    res.send(candidates);
});

app.post('/vote', (req, res) => {
    let message = ""
    if (req.body.constituency_id && req.body.candidate_id)
        axios.post(WEB_API + 'vote')
            .then(res => message = res.data.message)
            .catch(err => console.log(err));

    console.log(message);
    res.send({message: message});
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});