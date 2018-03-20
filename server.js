// server.js is required entry point for
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = dev ? 3000 : 8080;

app.prepare().then(() => {
  const server = express();

  // { year: '_next', month: '-', day: 'page', slug: '_error.js' }
  server.get('/_next/-/page/_error.js', (req, res) => {
    return handle(req, res);
  });

  server.get('/_next/-/page/_error.js.map', (req, res) => {
    return handle(req, res);
  });

  // Artwork
  server.get('/artwork/:id', (req, res) => {
    return app.render(req, res, '/artwork', { id: req.params.id });
  });

  // Custom route blog routes to the blog handler
  server.get('/:year/:month/:day/:slug', (req, res) => {
    //console.log('express...');
    //console.log(req.params);
    //console.log('--------------------------------');
    return app.render(req, res, '/blog/article', {}, req.params);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});