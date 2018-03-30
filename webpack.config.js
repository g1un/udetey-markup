const path = require('path');
const autoprefixer = require('autoprefixer');
const plugins = require('./webpack/plugins');
const includesLoader = require('./webpack/includesLoader');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');
// const DIST_DIR = path.resolve(__dirname, 'public');
// const HTML_DIR = path.resolve(__dirname, 'public/html');

const svgObject = require('./webpack/svgObject')(SRC_DIR + '/svg');

let config = (env, argv) => {
    let isProd = argv.mode === 'production';
    // let buildHtml = env ? env.html : false;

    // let app = (!isProd || buildHtml) ? 'dev.app.js' : 'app.js';
    // let TARGET_DIR = buildHtml ? HTML_DIR : DIST_DIR;

    return {
        entry: {
            // app: SRC_DIR + `/js/${app}`,
            app: SRC_DIR + `/js/dev.app.js`,
        },
        output: {
            // path: TARGET_DIR,
            path: DIST_DIR,
            filename: 'js/main.js'
        },

        resolveLoader: {
            modules: ['node_modules', './webpack/']
        },

        resolve: {
            modules: [
                "node_modules",
                "src/spritesmith-generated",
                "src/img",
                "src/fonts"
                // "resources/assets/spritesmith-generated",
                // "resources/assets/img",
                // "resources/assets/legacy/img",
                // "resources/assets/fonts"
            ]
        },

        module: {
            rules: [
                {
                    test: require.resolve('jquery'),
                    use: [
                        {
                            loader: 'expose-loader',
                            options: 'jQuery'
                        }
                    ]
                },

                {
                    test: /\.js$/,
                    include: SRC_DIR,
                    // exclude: SRC_DIR + '/legacy/js/legacy.js',
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: 'css/main.css'
                            }
                        },
                        {
                            loader: 'extract-loader',
                            options: {
                                publicPath: '../'
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                minimize: isProd,
                                // alias: {
                                //     "../fonts/roboto": path.resolve(__dirname, "node_modules/materialize-css/dist/fonts/roboto")
                                // }
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
                    include: [ SRC_DIR + '/spritesmith-generated' ],
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
                    include: [ SRC_DIR + '/img'/*, SRC_DIR + '/legacy/img'*/ ],
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[ext]'
                            }
                        }
                    ]

                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/i,
                    // include: [ SRC_DIR + '/fonts', path.resolve(__dirname, 'node_modules/materialize-css/dist/fonts/roboto') ],
                    include: [ SRC_DIR + '/fonts' ],
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[ext]'
                            }
                        }
                    ]

                }
            ]
        },

        plugins: plugins(isProd, SRC_DIR, DIST_DIR),

        devServer: {
            disableHostCheck: true,
            host: '0.0.0.0'
        },
        watchOptions: {
            poll: 1000,
            aggregateTimeout: 1000
        }
    }
};

module.exports = config;