// eslint-disable-next-line @typescript-eslint/no-var-requires
const withOffline = require('next-offline');

const nextConfig = {
  distDir: 'build',
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    API_HOST: 'https://blainegarrett-api-dot-blaine-garrett.appspot.com',
    GA_PRIMARY_TRACKER_ID: 'UA-150765667-1',
  },
};

// Comment out this conditional if you need to debug service worker during dev
// Note: You will also need to unregister the worker to not see the logs
if (process.env.NODE_ENV === 'production') {
  module.exports = withOffline(nextConfig);
} else {
  module.exports = nextConfig;
}
