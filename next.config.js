const withTM = require('next-transpile-modules')([

]);

module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,
  env: {
    // DEV_API: 'http://localhost:3031',
    // HOST_API_KEY: 'http://localhost:3030',
  },
});
