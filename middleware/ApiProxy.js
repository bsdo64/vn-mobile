var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var apiServer = 'http://127.0.0.1:3001';

module.exports = function(req, res) {
  console.log('proxy to ApiServer');
  apiProxy.web(req, res, {target: apiServer});
};

// Listen for the `error` event on `proxy`.
apiProxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Api Server went wrong.');
});
