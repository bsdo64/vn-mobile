var httpProxy = require('http-proxy');
var imageProxy = httpProxy.createProxyServer();
var imageServer = 'http://127.0.0.1:3002';

module.exports = function(req, res) {
  console.log('proxy to ImageServer');
  imageProxy.web(req, res, {target: imageServer});
};

// Listen for the `error` event on `proxy`.
imageProxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Image Server went wrong.');
});