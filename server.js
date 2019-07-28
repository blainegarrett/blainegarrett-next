const express = require('express');
const next = require('next');
const compression = require('compression');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

// GAE passes the port the app will run on via process.env.PORT
const port = process.env.PORT ? process.env.PORT : 3000;

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression());

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

    // Robots.txt
    server.get('/robots.txt', function(req, res) {
      res.type('text/plain');
      res.send('User-agent: *\nDisallow: /admin/\nDisallow: /api/');
    });

    // Favicon
    server.get('/favicon.ico', (req, res) =>
      res.status(200).sendFile('favicon.ico', { root: __dirname + '/static/' })
    );

    server.get('/_next/-/page/*', (req, res) => {
      return handle(req, res);
    });

    server.get('/about', (req, res) => {
      return app.render(req, res, '/about', req.params);
    });
    server.get('/links', (req, res) => {
      return app.render(req, res, '/links', req.params);
    });
    server.get('/blog', (req, res) => {
      return app.render(req, res, '/blog', req.params);
    });

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

    server.listen(port, err => {
      if (err) throw err;
      console.log(
        `> Ready on http://localhost:${port} NODE_ENV: ${process.env.NODE_ENV}`
      );
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
