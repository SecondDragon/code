"use strict";

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  nunjucks: {
    enable: true,
    package: "egg-view-nunjucks",
  },

  validate: {
    enable: true,
    package: "egg-validate",
  },

  mongoose: {
    enable: true,
    package: "egg-mongoose",
  },
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
};
