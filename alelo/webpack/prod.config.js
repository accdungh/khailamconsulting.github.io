const Webpack = require('webpack')
const {
    merge
} = require('webpack-merge')
const ROOT_PATH = process.cwd();
const BaseConfig = require('./base.config.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = function (env) {
    return merge(BaseConfig(env.env), {
        mode: 'production',
        optimization: {
            minimize: true,
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new Webpack.DefinePlugin({
                global: {},
                process: {
                    env: {
                        NODE_ENV: JSON.stringify('production')
                    }
                }
            }),
            new HtmlWebpackPlugin({
                title: 'SimServer - Instructor Dashboard',
                template: ROOT_PATH + `/assets/index.html`,
            }),
            new Webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            })
        ]
    })
}
