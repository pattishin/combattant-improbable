var path = require('path');
var webpack = require('webpack');

var NODE_ENV = process.env.NODE_ENV;

module.exports = {
    target: 'web',
    devtool: '#cheap-module-eval-source-map',

    entry: [
        'babel-polyfill',
        './src/main.jsx',
        'webpack-dev-server/src?http://localhost:3000',
        'webpack/hot/dev-server'
    ],

    output: {
        path: path.join(process.cwd(), '/src'),
        pathInfo: true,
        publicPath: 'http://localhost:3000/src/',
        filename: 'main.js'
    },

    plugins: [
        new webpack.DefinePlugin({
            __CURRENT_ENV__: '\'' + (NODE_ENV) + '\''
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    resolve: {
        root: path.join(__dirname, ''),
        modulesDirectories: [
            'node_modules',
            'src'
        ],
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },
    
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [ 
                    'react-hot',
                    'babel' 
                ],
                exclude: /node_modules/
            },
            {   
                test: /\.scss$/, 
                loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded'
            }
        ],
        noParse: /\.min\.js/
    }
};
