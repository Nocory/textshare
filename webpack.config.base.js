const webpack = require("webpack")

const path = require('path')
//const glob = require('glob')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin")

const ExtractTextPlugin = require("extract-text-webpack-plugin")
const ExtractNormal = new ExtractTextPlugin({
	filename: "[name]_[contenthash:8].css",
	disable: false,
	allChunks: true
})
const ExtractCritical = new ExtractTextPlugin({
	filename: "[name]_[contenthash:8]_critical.css",
	disable: false,
	allChunks: true
})


//const front-matter = null;

module.exports = {
	entry: {
		app: 'js/main.js'
	},
	output: {
		filename: '[name]_[chunkhash:8].js',
		path: path.resolve(__dirname, 'build')
	},
	/*
	watch: true,
	watchOptions: {
		ignored: path.resolve(__dirname, 'node_modules'),
		aggregateTimeout: 300
	},
	*/
	module: {
		rules: [{
				test: /\.md$/,
				//use: ['json-loader', 'yaml-frontmatter-loader']
				use: ['json-loader', 'front-matter']
			},
			{
				test: /critical\.(css|sass|scss)$/,
				use: ExtractCritical.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader'],
					allChunks: true
				})
			},
			{
				test: /^((?!critical).)*\.(css|sass|scss)$/,
				use: ExtractNormal.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader'],
					allChunks: true
				})
			},
			{
				test: /\.(ttf|eot|woff|woff2|svg)$/,
				loader: "url-loader?limit=10240&name=fonts/[name]_[hash:8].[ext]"
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: "url-loader?limit=10240&name=img/[name]_[hash:8].[ext]"
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader'
				}]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}
		]
	},
	resolve: {
		alias: {
			//"vue$": 'vue/dist/vue.esm.js',
			//"vue-router$": 'vue-router/dist/vue-router.esm.js'
		},
		modules: [
			path.resolve(__dirname, 'src'),
			path.resolve(__dirname, 'node_modules')
		]
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new CleanWebpackPlugin(['build'], {
			root: __dirname,
			verbose: false,
			dry: false,
			watch: false
		}),

		new webpack.EnvironmentPlugin(['NODE_ENV']),

		new webpack.optimize.CommonsChunkPlugin({
			minChunks: 2,
			children: true,
			async: true
		}),

		new HtmlWebpackPlugin({
			//inlineSource: '\.(js|css)$',
			inlineSource: 'critical\.css$',
			template: 'src/index.html'
		}),
		new HtmlWebpackInlineSourcePlugin(),
		//new CopyWebpackPlugin([{ from: 'src/assets/directCopy/*', to: 'directCopy/[name].[ext]' }]),
		ExtractCritical,
		ExtractNormal
		/*
		new ExtractTextPlugin({
			filename: "[name]_[contenthash:8].css",
			disable: false,
			allChunks: true
		})
		*/
	]
}