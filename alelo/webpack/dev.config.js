const Webpack = require('webpack')
const { merge } = require('webpack-merge')
const BaseConfig = require('./base.config.js')
const ROOT_PATH = process.cwd();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const path = require('path');

module.exports = function (env) {
    return merge(BaseConfig(env.env), {
        mode: 'development',
        devtool: 'inline-source-map',
        plugins: [
            new Webpack.DefinePlugin({
                global: {},
                process: {
                    env: {
                        NODE_ENV: JSON.stringify('development')
                    }
                }
            }),
            new HtmlWebpackPlugin({
                title: 'Enskill_3.0_SimServer_InstructorDashboard',
                template: ROOT_PATH + `/assets/index.html`,
            }),
            new BrowserSyncPlugin({
                host: '0.0.0.0',
                port: 8888,
                server: { baseDir: [path.join(ROOT_PATH, 'dist')] },
            })
        ]
    })
}
