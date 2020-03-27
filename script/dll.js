const webpack = require('webpack');
const dllConfig = require('../webpack.dll.config');

webpack(dllConfig, (err, stats) => {
    if (err) throw err
    console.log(stats.toString({colors: true}));
})