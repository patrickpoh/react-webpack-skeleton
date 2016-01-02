var path = require('path');
var webpack = require('webpack')

config = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
    	'webpack-hot-middleware/client',
    	path.resolve(__dirname, 'client/index')
    ],
    output: {
        path: path.resolve(__dirname, 'public/javascripts'),
        filename: 'bundle.js',
        publicPath: '/javascripts/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loaders: ['babel']
        }]
    }
};

module.exports = config;