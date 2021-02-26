const Glob = require('glob');
const ROOT_PATH = process.cwd();
const Autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = function (env) {
    return {
        target: 'web',
        entry: {
            main: Glob.sync(ROOT_PATH + "/assets/+(css|js)/+(*.js|*.css|*.scss)")
        },
        resolve: {
            extensions: ['.js', '.jsx', '.css', '.scss'],
            alias: {
                vue: 'vue/dist/vue.js'
            },
        },
        output: {
            path: ROOT_PATH + "/dist",
            chunkFilename: '[name].js'
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new VueLoaderPlugin(),
            new CopyPlugin({
                patterns: [
                    { from: ROOT_PATH + "/assets/scripts", to: ROOT_PATH + "/dist/scripts" },
                    { from: ROOT_PATH + "/assets/styles", to: ROOT_PATH + "/dist/styles" },
                    { from: ROOT_PATH + "/assets/images", to: ROOT_PATH + "/dist/images" },
                    { from: ROOT_PATH + "/assets/fonts", to: ROOT_PATH + "/dist/fonts" },
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
                    loader: 'vue-loader'
                },
                {
                    test: /\.(js|jsx)$/,
                    use: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: 'file-loader?name=images/[name].[ext]'
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader?url=false'
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
            ]
        }

    };
};
