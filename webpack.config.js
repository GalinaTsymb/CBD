const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');// for css
const TerserWebpackPlugin = require('terser-webpack-plugin');// for css
const Autoprefixer = require('autoprefixer');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
/**
 * function get optimization object
 * @returns {{splitChunks: {chunks: string}}} - object
 */
const optimization = () => {
    // оптимизирует финальный bundle, добавляеться файл vendor
    const config = {
        splitChunks: {
            chunks: "all"
        }
    };
    // если сборка - production, тогда файл css необходимо минимизировать
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config;
};
/**
 * function create filename, if development - we not create hash key
 * @param ext
 * @returns {string}
 */

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;


/**
 * function get all standart css-loaders, when we have another loaders, give their about parameter.
 * Done to remove code duplication
 * @param extra
 * @returns {[{loader: string, options: {reloadAll: boolean, hmr: boolean}}, string]}
 */
const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            },
        },
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                config:{
                    path: 'postcss.config.js'
                }
            }
        }
    ];
    if (extra) {
        loaders.push(extra);
    }
    return loaders;
};
const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    };

    if (preset) {
        opts.presets.push(preset)
    }

    return opts;
};
const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }];

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders;
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './main.js'],
        analytics: './analytics.js'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        //в import можем не указывать расширение
        extensions: ['.js', '.json', '.svg', '.png', 'jpg', 'scss'],
        //позволяет избавить от большой записи, если есть глубокая вложенность
        alias: {
            '@modules': path.resolve(__dirname, 'src/modules'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    devtool:       isDev ? 'source-map' : '',
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/faviconBush.jpg'),
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'src/images'),
                    to: path.resolve(__dirname, 'dist/images')
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {

                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [{
                    loader:'file-loader',
                    options: {
                        name: 'images/[name][hash].[ext]'
                    }
                }]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },

        ]

    }
};