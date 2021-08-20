const rc = require('rc');

const appName = require('../package.json').name;

/**
 * @typedef {Object} IConfig
 * @property {string|number} PORT
 * @property {object} API_KEYS
 * @property {string} API_KEYS.YAHOO_FIN
 * @property {string} API_KEYS.SEND_GRID
 */
const defaults = {
  PORT: process.env.PORT || 3000,
  API_KEYS: {
    YAHOO_FIN: '',
    SEND_GRID: '',
  },
};

/**
 * @type {IConfig}
 */
const config = rc(appName, defaults);

module.exports = config;
