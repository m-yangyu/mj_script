const path = require('path');

const DIR = process.cwd();
const viewDIR = `${DIR}/src/view`
const sourceDIR = `${DIR}/src`
const outputDIR = `${DIR}/dist`
const cliPath = path.resolve(__dirname, '../../');
const pluginPath = path.resolve(__dirname, '../../cli/plugins/defaultPlugins');
const frameworkPath = path.resolve(__dirname, '../../cli/plugins/framework');

module.exports = {
    DIR,
    viewDIR,
    outputDIR,
    sourceDIR,
    cliPath,
    pluginPath,
    frameworkPath
}