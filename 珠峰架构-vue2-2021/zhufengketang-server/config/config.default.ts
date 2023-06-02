import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610893700374_7674';

  


  config.mongoose = {
    client: {
      url: 'mongodb://localhost/ketang',
      options: {
        useUnifiedTopology: true
      },
    }
  }

  config.security = {
    csrf: {
      enable: false
    }
  }
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  config.privateKey = 'zf'
  // add your egg config in here
  config.middleware = ['auth'];
  config.auth = {
    privateKey:config.privateKey
  }

 

  // the return config will combines to EggAppConfig
  return {
    ...config,
  };
};
