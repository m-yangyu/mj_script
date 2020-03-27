const webpack = require('webpack');
const dllConfig = require('../webpack.dll.config');

module.exports = function() {
    webpack(dllConfig, (err, stats) => {
        if (err) throw err
        console.log(stats.toString({colors: true}));
    })
}