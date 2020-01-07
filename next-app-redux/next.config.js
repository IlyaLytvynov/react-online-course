const withSass = require('@zeit/next-sass');
const withPlugins = require('next-compose-plugins');

const config = {
  publicRuntimeConfig: {
    API_URL: process.env.REACT_APP_CLIENT_ID
  }
};

module.exports = withPlugins([
  withSass({
    cssModules: true
  })
]);
