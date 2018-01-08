const { resolve, basename } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const fs = require('fs')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const LinkMediaHtmlWebpackPlugin = require('link-media-html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const ImageOptimizePlugin = require('imagemin-webpack-plugin').default

/** Environment information */
const devMode = process.env.NODE_ENV !== 'production'
const isPR = process.env.ghprbPullId && process.env.ghprbPullId != 'false'
const prNumber = process.env.ghprbPullId


// To make LinkMediaHtmlWebpackPlugin add automatically the media...
const encodedMediaScreen = `media_${new Buffer('screen').toString('base64')}`
const extractSass = new ExtractTextPlugin({
    filename: `[name].[contenthash].${encodedMediaScreen}.css`,
})

// To make LinkMediaHtmlWebpackPlugin add automatically the media...
const encodedMediaPrint = `media_${new Buffer('print').toString('base64')}`
const extractPrintSass = new ExtractTextPlugin({
    filename: `[name].[contenthash].${encodedMediaPrint}.css`,
})

const dist = resolve(__dirname, '../dist/')
const src = resolve(__dirname, '../src/')

const additionalPlugins = !devMode ? [
    /** Prod mod */
    new ImageOptimizePlugin()
] : [
    /** Dev mod */
    new webpack.HotModuleReplacementPlugin()
]

// Calculate base path when deployed.
const base = isPR
    ? `/${prNumber}/`
    : `/`

const fullPath = `https://tourainetech.github.io${base}`

module.exports = {
    entry    : resolve(src, 'index.js'),
    output   : {
        path      : dist,
        filename  : '[name].[hash].js',
        publicPath: !devMode ? base : '/'
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
                    // use style-loader in development
                    fallback: 'style-loader'
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
            }, {
                test: /\.html$/,
                use : {
                    loader: 'html-loader?interpolate'
                }
            }, {
                test: /\.md/,
                use : {
                    loader: resolve(__dirname, './loaders/article.js')
                }
            }, {
                test : /\.(svg|png|jpe?g)$/,
                oneOf: [
                    {
                        resourceQuery: /absolute/,
                        use          : {
                            loader : 'file-loader',
                            options: {
                                outputPath: 'static/',
                                publicPath: devMode
                                    ? '/'
                                    : fullPath
                            }
                        }
                    }, {
                        use: {
                            loader : 'file-loader',
                            options: {
                                outputPath: 'static/',
                            }
                        }
                    }
                ]
            }
        ]
    },
    devtool  : '#source-map',
    target   : 'web',
    devServer: {
        inline     : true,
        compress   : true,
        contentBase: dist,
        host       : '0.0.0.0',
        port       : 4000,
        open       : true,
        overlay    : true,
    },
    plugins  : additionalPlugins.concat([
        new webpack.DefinePlugin({
            base: JSON.stringify(base),
        }),
        new CleanPlugin([ 'dist' ], {
            root: resolve(__dirname, '..')
        }),
        ...listAllPages(),
        new FaviconsWebpackPlugin(resolve(__dirname, '../img/logo_tnt.png')),
        new LinkMediaHtmlWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        extractSass,
        extractPrintSass
    ])
}

/** Tools to handle all pages made in the project without configuring each one individually */
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