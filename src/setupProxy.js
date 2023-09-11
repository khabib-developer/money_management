const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
   app.use(
       '/api',
       createProxyMiddleware({
          target: 'http://35.225.155.180',
          changeOrigin: true,
       })
   );
};