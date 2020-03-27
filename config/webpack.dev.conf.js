const { DIR } = require('./static');

module.exports = {
    mode:'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase : `${DIR}/dist`,
        compress: true,
        port: 8080,
        hot: true,
        inline: true,
        stats: "errors-only",
    },
};