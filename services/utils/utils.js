const fs = require('fs');
const {
    mkdir,
    hasPath,
} = require('../../cli/tools/files');


const getDirPlugins = async (path) => {
    const hasPluginDir = await hasPath(path);
    if (!hasPluginDir) {
        await mkdir(path);
    }
    return fs.readdirSync(path);
}

module.exports = {
    getDirPlugins
}