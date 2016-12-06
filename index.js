`use strict`

var fs = require('fs');
var path = require('path');

var express = require('express');
var app = express();

var compress = require('compression');

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), '/server/views'));

app.use(compress());
app.use('/src', express.static(path.join(process.cwd(), '/src')));

app.disable('x-powered-by');

var port = Number(process.env.PORT || 3001),
    webpackPort = Number(process.env.WEBPACKPORT || 3000),
    env = {
        production: process.env.NODE_ENV === 'production'
    };

if (env.production) {
    Object.assign(env, {
        assets: JSON.parse(
            fs.readFileSync(path.join(process.cwd(), 'assets.json'))
        )
    });
}

app.get('/*', function (req, res) {
    res.render('index', { env: env });
});

app.listen(port, function() {
    console.log('Example app listening on port ' + port);
});

// webpack initialization
var webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackDevConfig = require('./webpack.config');

new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: '/src/',
    contentBase: './src/',
    inline: true,
    hot: true,
    stats: false,
    historyApiFallback: true,
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:' + port,
        'Access-Control-Allow-Headers': 'X-Requested-With'
    }
}).listen(webpackPort, 'localhost', function(err) {
    if (err) { console.log(err); }
    console.log('Webpack Dev Server listening on localhost:' + webpackPort);
});

