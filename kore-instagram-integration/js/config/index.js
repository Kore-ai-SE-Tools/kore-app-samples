const devConfig = require('./dev.config');
const testConfig = require('./test.config');
const prodConfig = require('./prod.config');

let config = devConfig;

const nodeEnv = process.env['NODE_ENV'];

if (typeof nodeEnv === 'string' && nodeEnv.toLowerCase() === 'production') {
    config = prodConfig;
}

if (typeof nodeEnv === 'string' && nodeEnv.toLowerCase() === 'testing') {
    config = testConfig;
}

module.exports = config;