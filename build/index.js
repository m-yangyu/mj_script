// const buildConfig = require('./webpack/webpack.pro.conf');
const fs = require('fs');
const configFactory = require('../config/webpack.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const { DIR, sourceDIR } = require('../config/static')
const merge = require('webpack-merge');
const chalk = require('chalk');

module.exports = function(options) {
    const {isAnalyz = false, isPre = false} = options || {};

    let config = configFactory(isPre ? 'preProduction' : 'production');
    let rootProConfig = {};
    let rootPreConfig = {};
    let analyzConfig = {};

    if (!isPre && fs.existsSync(`${DIR}/config/proConfig.js`)) {
        rootProConfig = require(`${DIR}/config/proConfig.js`);
    }

    if (isPre && fs.existsSync(`${DIR}/config/preConfig.js`)) {
        rootPreConfig = require(`${DIR}/config/preConfig.js`);
    }
    
    if (isAnalyz) {
        analyzConfig = {
            plugins: [
                new BundleAnalyzerPlugin()
            ]
        }
    }

    const compiler = webpack(
        merge(
            config, 
            isPre ? rootPreConfig : rootProConfig, 
            analyzConfig
        )
    );
    compiler.run((err, stats) => {
        if (err) console.log(chalk.red(err));

        const infos = stats.toJson();
        if (stats.hasErrors()) {
            console.log(`${chalk.yellow('Compiled is error')}\n`);
            console.error(`${chalk.red(infos.errors)}\n`);
            return ;
        }

        console.log(stats.toString({colors: true}));
    })
}