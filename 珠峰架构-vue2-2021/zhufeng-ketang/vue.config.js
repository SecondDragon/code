const path = require('path');
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss', // 自动引入 在当前每个页面中导入scss变量
      // patterns:[]
      patterns: [path.resolve(__dirname,'src/assets/common.scss')]
    }
  },
  css: {
    loaderOptions: {
        postcss: {
            plugins: [ // vant-ui
                require("postcss-plugin-px2rem")({
                    // 375 =>37.5rem  1 rem 20
                    rootValue: 37.5, // 表示设计稿的大小  375 =>37.5rem   75  750 => 75rem
                })
            ]
        }
    }
}
  // 配置 px2rem  postcss-plugin-px2rem  lib-flexiable
}

