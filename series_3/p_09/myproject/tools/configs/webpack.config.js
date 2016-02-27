const path            = require('path');
const extend          = require('extend');
const webpack         = require('webpack');

/*
======================================================================
    DIRECTORY PATHS
======================================================================
*/

const PATHS = {
  index: path.join(__dirname, '../../src/server/static/js/index.js'),
  build: path.join(__dirname, '../../build/js'),
  javascripts: path.join(__dirname, '../../src/server/static/js/'),
  styles: path.join(__dirname, '../../src/server/static/sylus/'),
  eslint: path.resolve(__dirname, './.eslintrc'),
};

/*
======================================================================
    COMMON WEBPACK SETTINGS
======================================================================
*/

const common = {
    devtool: "eval",

    eslint: {
        configFile: PATHS.eslint,
    },

    output: {
        filename: 'bundle.js',
        path: PATHS.build,
    },

    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: "eslint-loader",
                include: PATHS.javascripts,
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                include: [
                    PATHS.javascripts,
                    PATHS.styles,
                ],
                query: {
                  plugins: ['transform-runtime'],
                  presets: ['es2015'],
                }
            },
        ],
    },
};

/*
======================================================================
    WEBPACK DEV SETTINGS

    see common for the other settings.
======================================================================
*/

const webpackDev = extend(true, {}, common, {
    // extends common.entry
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        PATHS.index,
    ],

    // extends common.output
    output: {
        publicPath: 'http://localhost:3000/build/js',
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
});

/*
======================================================================
    WEBPACK PROD SETTINGS

    see common for the other settings
======================================================================
*/

const webpackProd = extend(true, {}, common, {
    entry: [
        PATHS.index,
    ],

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
});

/*
======================================================================
    RETURN DEV AND PRODUCTION SETTINGS
======================================================================
*/
module.exports = {
    dev: webpackDev,
    prod: webpackProd
}
