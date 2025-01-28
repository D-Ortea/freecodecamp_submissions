require('dotenv').config();
const URL = require('url').URL;
const dns = require('dns');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const urlMap = []
let counter = 1;

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:id', (req, res) => {
  const id = req.params.id;
  if (id && Number.isInteger(+id) && urlMap[id]) {
    return res.json({ error: "No short URL found for the given input" });
  }

  res.redirect(urlMap[id]);
});

app.post('/api/shorturl', (req, res) => {
  try {
    const url = new URL(req.body.url);
    dns.lookup(url.hostname, (err, address, family) => {
      if (err) {
        return res.json({ error: 'invalid url' });
      }

      urlMap.push(req.body.url);

      res.json({
        original_url: req.body.url,
        short_url: counter++
      });

    });
  } catch (err) {
    res.json({ error: 'invalid url' });
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

