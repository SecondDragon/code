/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611985751982_2527';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.mongoose = {
    url: 'mongodb://127.0.0.1/blog',
    options: {},
  };
  config.secret = 'zf';
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    }
  }

    return {
      ...config,
      ...userConfig,
    };
  };
