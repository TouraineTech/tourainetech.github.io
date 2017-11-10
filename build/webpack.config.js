const { resolve, basename } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const fs = require('fs')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const LinkMediaHtmlWebpackPlugin = require('link-media-html-webpack-plugin')

let devMode = process.env.NODE_ENV !== 'production'
const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
})

// To make LinkMediaHtmlWebpackPlugin add automatically the media...
const encodedMediaPrint = `media_${new Buffer('print').toString('base64')}`

const extractPrintSass = new ExtractTextPlugin({
    filename: `[name].[contenthash].${encodedMediaPrint}.css`,
})

const dist = resolve(__dirname, '../dist/')
const src = resolve(__dirname, '../src/')

const devPlugins = !devMode ? [] : [
    new webpack.HotModuleReplacementPlugin()
]

module.exports = {
    entry    : resolve(src, 'index.js'),
    output   : {
        path    : dist,
        filename: '[name].[hash].js'
    },
    module   : {
        rules: [
            {
                test   : /\.js$/,
                exclude: /node_modules/,
                use    : {
                    loader : 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            }, {
                test: /print\.scss$/,
                use : extractPrintSass.extract({
                    use     : [ {
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader'
                    }, {
                        loader: 'sass-loader'
                    } ],
                })
            }, {
                test   : /\.scss$/,
                exclude: /print\.scss$/,
                use    : extractSass.extract({
                    use     : [ {
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader'
                    }, {
                        loader: 'sass-loader'
                    } ],
                    // use style-loader in development
                    fallback: 'style-loader'
                })
            },{
                test: /\.html$/,
                use : {
                    loader: 'html-loader?interpolate'
                }
            }, {
                test: /\.(svg|png|jpe?g)$/,
                use : {
                    loader : 'file-loader',
                    options: {
                        publicPath: devMode ? '/' : 'https://touraine.tech/'
                    }
                }
            }
        ]
    },
    devtool  : '#source-map',
    target   : 'web',
    devServer: {
        hot        : true,
        inline     : true,
        compress   : true,
        contentBase: dist,
        port       : 4000,
        open       : true,
        overlay    : true,
    },
    plugins  : devPlugins.concat([
        ...listAllPages(),
        new FaviconsWebpackPlugin(resolve(__dirname, '../img/logo_tnt.png')),
        new LinkMediaHtmlWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        extractSass,
        extractPrintSass,
    ])
}

function listAllPages() {
    return listFiles(resolve(__dirname, '../src'))
        .filter(f => f.match(/\.html$/))
        .map(page => new HTMLPlugin({
            template: page,
            filename: basename(page)
        }))
}

function listFiles(dir) {
    const files = fs.readdirSync(dir)
    return files
        .map(file => resolve(dir, file))
        .filter((filePath) => !fs.statSync(filePath).isDirectory())
}