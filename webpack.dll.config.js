const path = require('path');
const webpack = require('webpack')
const DllPlugin = webpack.DllPlugin;
const { DIR, outputDIR } = require('./static');
const packageJson = require(`${DIR}/package.json`);
const filterConfig = require(`${DIR}/config/dllConfig.js`);


const filterEnter = (entry) => {
    filterConfig.map(name => {
        const index = entry.indexOf(name);
        if (~index) {
            entry.splice(index, 1);
        }
    })
    return entry;
}

const getEntry = () => {
    const entryObj = {
        ...packageJson.dependencies
    }
    return filterEnter(Object.keys(entryObj))
}

module.exports = {
    entry: {
        lib: getEntry()
    },
    output: {
        path: `${DIR}/lib`,
        filename: '[name].js',
        chunkFilename: '[name].[contenthash:8].js',
    },
    plugins: [
        new DllPlugin({
            name: '[name]',
            path: path.join(`${DIR}/lib`, 'manifest.json'),
            context: DIR
        })
    ]
}