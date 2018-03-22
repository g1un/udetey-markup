const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

let plugins = (isProd, src, dist) => {
    let SRC_DIR = src;
    let DIST_DIR = dist;

    //common for dev and prod plugins
    let pluginsArr = [
        new CopyWebpackPlugin([
            {
                from: SRC_DIR + '/img/',
                to: DIST_DIR + '/img/'
            }
        ]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            disable: !isProd,
            optipng: {
                optimizationLevel: 3
            }

        })
    ];

    //3 sprites: 1x, 2x, 3x
    for(let i = 1; i < 4; i++) {
        pluginsArr.push(
            new SpritesmithPlugin({
                src: {
                    cwd: path.resolve(__dirname, `../src/sprite/${i}x`),
                    glob: '*.png'
                },
                target: {
                    image: path.resolve(__dirname, `../spritesmith-generated/sprite${i}x.png`),
                    css: path.resolve(__dirname, `../src/scss/components/sprite/_sprite${i}x.scss`)
                },
                apiOptions: {
                    cssImageRef: `~sprite${i}x.png`
                    // cssImageRef: `../img/sprite/sprite${i}x.png`
                }
            })
        );
    }

    return pluginsArr;
};

module.exports = plugins;