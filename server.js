/**
 * Custom Express Server for next.js
 * 
 * Why we need this still?
 *  - Next 9 dynamic file routing gets confused on overlapping dynamic routes (i.e. /[category] vs /[year]/[month]/[day]/[slug])
 *  - GAE passes the PORT via a environment variable that we need to read
 *  - Things like robots.txt COULD be moved to app.yaml
 *  - next-offline needs to handle service worker
 */
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

    // TODO: compression might be on by default in next 9...
    server.use(compression());

    // Robots.txt
    server.get('/robots.txt', function(req, res) {
      res.type('text/plain');
      res.send('User-agent: *\nDisallow: /admin/\nDisallow: /api/');
    });

    // Service Worker 
    server.get('/service-worker.js', (req, res) => {
      res.status(200).sendFile('/service-worker.js', { root: __dirname + '/build/' });
    });

    // Manifest
    server.get('/manifest.json', (req, res) => {
      res.status(200).sendFile('manifest.json', { root: __dirname + '/static/' });
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

    // Category
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
