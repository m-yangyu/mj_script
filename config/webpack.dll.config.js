const path = require('path');
const fs = require('fs');
const webpack = require('webpack')
const DllPlugin = webpack.DllPlugin;
const { DIR, outputDIR } = require('./static');


const filterEnter = (entry) => {
    const configFilePath = `${DIR}/config/dllConfig.js`;
    if (fs.existsSync(configFilePath)) {
        const filterConfig = require(configFilePath);
        filterConfig.map(name => {
            const index = entry.indexOf(name);
            if (~index) {
                entry.splice(index, 1);
            }
        })
    }
    return entry;
}

const getEntry = () => {
    const packagePath = `${DIR}/package.json`;
    if (fs.existsSync(packagePath)) {
        const packageJson = require(packagePath);
        const entryObj = {
            ...packageJson.dependencies
        }
        return filterEnter(Object.keys(entryObj))
    }
    return []
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