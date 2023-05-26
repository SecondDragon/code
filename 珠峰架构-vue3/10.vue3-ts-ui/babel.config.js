module.exports = {
    presets: [ // babel解析的预设 反着执行的
        '@babel/preset-env',
        '@babel/preset-typescript'
    ],
    overrides: [{
        test: /\.vue$/,
        plugins: [
            '@babel/transform-typescript'
        ]
    }]
}