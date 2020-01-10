const withOffline = require('next-offline');

const nextConfig = {
  distDir: 'build',
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    API_HOST: 'https://blainegarrett-api-dot-blaine-garrett.appspot.com',
    GA_PRIMARY_TRACKER_ID: 'UA-150765667-1'
  }
};

module.exports = withOffline(nextConfig);