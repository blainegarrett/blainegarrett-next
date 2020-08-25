// eslint-disable-next-line @typescript-eslint/no-var-requires
const withOffline = require('next-offline');

const nextConfig = {
  distDir: 'build',
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    API_HOST: process.env.API_HOST,
    GA_PRIMARY_TRACKER_ID: 'UA-150765667-1',
  },
  workboxOpts: { swDest: './static/service-worker.js' },
  async rewrites() {
    return [
      { source: '/favicon.ico', destination: '/static/favicon.ico' },
      { source: '/robots.txt', destination: '/static/robots.txt' },
      { source: '/service-worker.js', destination: '/_next/static/service-worker.js' },
      { source: '/:year/:month/:day/:slug', destination: '/blog/article?lol=wut' },
      { source: '/:slug', destination: '/blog/category' },
    ];
  },
};

// Comment out this conditional if you need to debug service worker during dev
// Note: You will also need to unregister the worker to not see the logs
if (process.env.NODE_ENV === 'production') {
  module.exports = withOffline(nextConfig);
} else {
  module.exports = nextConfig;
}
