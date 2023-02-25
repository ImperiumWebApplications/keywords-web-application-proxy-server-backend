const express = require('express');
const https = require('https');
const fs = require('fs');
const request = require('request')

const app = express();

// Load SSL/TLS certificate and key files
const options = {
  key: fs.readFileSync('/home/ubuntu/certificates/private.key'),
  cert: fs.readFileSync('/home/ubuntu/certificates/certificatefinal.crt')
};

app.get('/suggestqueries', (req, res) => {
    const url = `https://suggestqueries.google.com/complete/search?client=chrome&q=${req.query.q}`;
  
    // Set CORS headers to allow cross-origin requests
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    // Forward request to Google Suggest API endpoint
    req.pipe(request(url)).pipe(res);
  });

https.createServer(options, app).listen(443, () => {
  console.log('HTTPS proxy server running on port 443');
});
