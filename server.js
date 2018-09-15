// server.js is required entry for GAE (vs. start script) - This will likely not be the case post EAP
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const port = dev ? 3000 : 8080;
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // If you need /:param/ type urls allow next and webpack urls - see: https://github.com/zeit/next.js/issues/1433
  //server.get(/next/, (req,res)=> { handle(req,res); });
  //server.get(/webpack/, (req,res)=> { handle(req,res); });

  // { year: '_next', month: '-', day: 'page', slug: '_error.js' }
  /*
  server.get('/_next/-/page/_error.js', (req, res) => {
    return handle(req, res);
  });

  server.get('/_next/-/page/_error.js.map', (req, res) => {
    return handle(req, res);
  });
  */

  server.get('/_next/-/page/*', (req, res) => {
    return handle(req, res);
  });

  server.get('/about', (req, res) => { return app.render(req, res, '/about', req.params); });
  server.get('/links', (req, res) => { return app.render(req, res, '/links', req.params); });
  server.get('/blog', (req, res) => { return app.render(req, res, '/blog', req.params); });

  server.get('/:slug', (req, res) => {
    return app.render(req, res, '/blog/category', req.params);
  });

  // Route traffic for /yyy/mm/dd/slug to /pages/blog/article.js
  server.get('/20:year/:month/:day/:slug', (req, res) => {
    // url params - note query is ignored. If you need query params, see: https://github.com/zeit/next.js/blob/master/examples/parameterized-routing/server.js#L25
    return app.render(req, res, '/blog/article', req.params);
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