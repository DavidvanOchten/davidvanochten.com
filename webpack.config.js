const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
		app: [
      './src/js/app.js',
      './src/css/app.css'
    ]
	},
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public')
	},
	module: {
    rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: [
						'babel-loader',
				]
			},
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader'],
				})
      }
    ]
	},
	plugins: [
		new UglifyJSPlugin(),
		new ExtractTextPlugin({
			filename: '[name].bundle.css',
			allChunks: true
		})
	]
};