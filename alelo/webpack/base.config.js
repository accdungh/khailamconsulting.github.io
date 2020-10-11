const Glob = require('glob');
const ROOT_PATH = process.cwd();
const Autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Webpack = require('webpack');

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
            path: ROOT_PATH + "/assets/dist",
            chunkFilename: '[name].js',
            sourceMapFilename: '[name].map',
            publicPath: ROOT_PATH
        },
        plugins: [
            new ExtractTextPlugin("[name].css"),
            new VueLoaderPlugin(),
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
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader?url=false'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [Autoprefixer('last 2 versions', 'ie 10')];
                                }
                            }
                        }]
                    })
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader?url=false'
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [Autoprefixer('last 2 versions', 'ie 10')];
                                }
                            }
                        }]
                    })
                }
            ]
        }

    };
};
