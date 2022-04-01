const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/asset/request-upload',
    createProxyMiddleware({
      target: 'https://livepeer.com',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/asset/',
    createProxyMiddleware({
      target: 'https://livepeer.com',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/task/',
    createProxyMiddleware({
      target: 'https://livepeer.com',
      changeOrigin: true,
    })
  );
};