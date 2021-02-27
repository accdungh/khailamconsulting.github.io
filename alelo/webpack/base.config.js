const Glob = require('glob');
const ROOT_PATH = process.cwd();
const Autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = function (env) {
    return {
        target: 'web',
        entry: {
            main: Glob.sync(ROOT_PATH + "/assets/+(css|js)/+(*.js|*.css|*.scss)")
        },
        resolve: {
            extensions: ['.js', '.jsx', '.css', '.scss'],
            alias: {
                '@assets': path.join(ROOT_PATH, 'assets'),
                vue: 'vue/dist/vue.js'
            },
        },
        output: {
            path: path.join(ROOT_PATH, 'dist'),
            chunkFilename: '[name].js',
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new VueLoaderPlugin(),
            new CopyPlugin({
                patterns: [
                    { from: path.join(ROOT_PATH, "assets", "scripts"), to: path.join(ROOT_PATH, "dist", "scripts") },
                    { from: path.join(ROOT_PATH, "assets", "styles"), to: path.join(ROOT_PATH, "dist", "styles") },
                ],
            }),
        ],
        externals: {
            jquery: 'jQuery',
            $: 'jQuery',
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.(js|jsx)$/,
                    use: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: ''
                            }
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: function () {
                                        return [
                                            require('precss'),
                                            require('autoprefixer')
                                        ];
                                    }
                                }
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
            ]
        }

    };
};
