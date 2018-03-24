const path = require('path');
const autoprefixer = require('autoprefixer');
const plugins = require('./helpers/plugins');
const includesLoader = require('./helpers/includesLoader');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

const svgObject = require('./helpers/svgObject')(SRC_DIR + '/svg');

let config = (env, argv) => {
    let isProd = argv.mode === 'production';

    return {
        entry: SRC_DIR + '/js/app.js',
        output: {
            path: DIST_DIR,
            filename: 'js/bundle.js'
        },

        resolveLoader: {
            modules: ['node_modules', './helpers/', './']
        },

        resolve: {
            modules: ["node_modules", "spritesmith-generated", "src/img"]
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: SRC_DIR,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: 'css/style.css'
                            }
                        },
                        {
                            loader: 'extract-loader',
                            options: {
                                publicPath: '../'
                            }
                        },
                        // 'test-loader',
                        {
                            loader: "css-loader",
                            options: {
                                minimize: isProd,
                                // url: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [autoprefixer('last 2 versions', 'ie 10')]
                                }
                            }
                        },
                        "sass-loader"
                    ]
                },
                {
                    test: /\.pug$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].html'
                            }
                        },
                        {
                            loader: 'pug-html-loader',
                            // query: {},
                            options: {
                                pretty: true,
                                data: {
                                    svg: svgObject
                                }
                            }
                        },
                        {
                            loader: 'includesLoader',
                            options: {
                                pathToIncludes: SRC_DIR + '/includes'
                            }
                        }
                    ]
                },
                {
                    test: /\.png$/,
                    include: [ path.resolve(__dirname, 'spritesmith-generated') ],
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'img/sprite/[name].png'
                            }
                        }
                    ]

                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    include: [ SRC_DIR + '/img' ],
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[ext]'
                            }
                        }
                    ]

                }
            ]
        },

        plugins: plugins(isProd, SRC_DIR, DIST_DIR),

        devServer: {
            historyApiFallback: true,
            disableHostCheck: true,
            host: '0.0.0.0'
        }
    }
};

module.exports = config;