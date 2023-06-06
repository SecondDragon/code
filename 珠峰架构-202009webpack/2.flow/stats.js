let s = {
    errors: [],//发生了哪些错误
    warnings: [],//发生了哪些警告
    version: '4.44.1',//webpack版本号
    hash: '501181be534761b92e62',//本次编译的hash值
    time: 84,//编译花了多长时间
    builtAt: 1599376837889,//编译的时间 时间戳
    publicPath: '',//打包的的文件的访问路径
    outputPath: 'C:\\aproject\\zhufeng202009webpack\\2.flow\\dist',//打包后的文件写入到哪个目录里
    assetsByChunkName: { main: 'bundle.js' },//代码块的名字:文件(产出资源的)的名字
    assets: [
      {
        name: 'bundle.js',//文件的名称
        size: 3828,//文件大小
        chunks: [Array],
        chunkNames: [Array],
        info: {},
        emitted: true,
        isOverSizeLimit: undefined
      },
      {
        name: 'index.html',
        size: 247,
        chunks: [],
        chunkNames: [],
        info: {},
        emitted: true,
        isOverSizeLimit: undefined
      }
    ],
    filteredAssets: 0,
    entrypoints: {
      main: {
        chunks: [Array],
        assets: [Array],
        children: [Object: null prototype] {},
        childAssets: [Object: null prototype] {},
        isOverSizeLimit: undefined
      }
    },
    namedChunkGroups: {
      main: {
        chunks: [Array],
        assets: [Array],
        children: [Object: null prototype] {},
        childAssets: [Object: null prototype] {},
        isOverSizeLimit: undefined
      }
    },
    chunks: [
      {
        id: 'main',
        rendered: true,
        initial: true,
        entry: true,
        recorded: undefined,
        reason: undefined,
        size: 21,
        names: [Array],
        files: [Array],
        hash: 'efb0a4bb0aa40131f0d4',
        siblings: [],
        parents: [],
        children: [],
        childrenByOrder: [Object: null prototype] {},
        modules: [Array],
        filteredModules: 0,
        origins: [Array]
      }
    ],
    modules: [
      {
        id: './src/index.js',
        identifier: 'C:\\aproject\\zhufeng202009webpack\\2.flow\\src\\index.js',
        name: './src/index.js',
        index: 0,
        index2: 0,
        size: 21,
        cacheable: true,
        built: true,
        optional: false,
        prefetched: false,
        chunks: [Array],
        issuer: null,
        issuerId: null,
        issuerName: null,
        issuerPath: null,
        profile: undefined,
        failed: false,
        errors: 0,
        warnings: 0,
        assets: [],
        reasons: [Array],
        providedExports: null,
        optimizationBailout: [],
        depth: 0,
        source: "console.log('index');"
      }
    ],
    filteredModules: 0,
    logging: {
      'webpack.buildChunkGraph.visitModules': { entries: [], filteredEntries: 2, debug: false }
    },
    children: [
      {
        errors: [],
        warnings: [],
        publicPath: '',
        outputPath: 'C:\\aproject\\zhufeng202009webpack\\2.flow\\dist',
        assetsByChunkName: [Object],
        assets: [Array],
        filteredAssets: 0,
        entrypoints: [Object],
        namedChunkGroups: [Object],
        chunks: [Array],
        modules: [Array],
        filteredModules: 0,
        logging: [Object],
        children: [],
        name: 'HtmlWebpackCompiler'
      }
    ]
  }
  