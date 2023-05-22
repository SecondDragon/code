const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	mode: 'production',
	entry: './src/main.js',
	output: {
		filename: 'main.[hash].min.js',
		path: path.resolve(__dirname, 'build')
	},
	devServer: {
		port: '3001',
		compress: true,
		open: true,
		proxy: {
			'/': {
				target: 'http://127.0.0.1:8888',
				changeOrigin: true
			}
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: `./public/index.html`,
			filename: `index.html`
		})
	]
};