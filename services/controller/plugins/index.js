const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const {
    pluginsPath,
    frameworkPath
} = require('../../config');
const {
    readFilesStream,
    mkdir,
    hasPath,
} = require('../../../cli/tools/files');
const {
    cliPath
} = require('../../../config/static')

const needZipPath = {
    plugin: pluginsPath,
    framework: frameworkPath,
    addView: `${cliPath}/add/template`
}

class PluginController {
    constructor() {

    }
    async getPlugins(ctx) {

        const getPlugins = async (path) => {
            const hasPluginDir = await hasPath(path);
            if (!hasPluginDir) {
                await mkdir(path);
            }
            return fs.readdirSync(path);
        }

        const pluginsDir = await getPlugins(pluginsPath);
        const frameworkDir = await getPlugins(frameworkPath);
        const addViewDir = await getPlugins(needZipPath.addView);
        
        ctx.body = {
            pluginsDir,
            frameworkDir,
            addViewDir
        }
    }
    async downLoadPlugin(ctx) {
        const { plugin_name = ''} = ctx.query;
        const { choose = 'plugin' } = ctx.params;
        if (!plugin_name) {
            ctx.throw('插件名称必须填写');
        }
        const zipPath = path.resolve(cliPath, './pluginsZip');
        const hasPluginsZip = await hasPath(zipPath);
        if (!hasPluginsZip) {
            await mkdir(zipPath);
        }

        const zipName = `${zipPath}/${plugin_name}.zip`;

        if (!fs.existsSync(zipName)) {
            const compress = () => {
                return new Promise((resolve, reject) => {
                    const output = fs.createWriteStream(zipName);
                    const archive = archiver('zip');
                    archive.on('error', function(err){
                        reject(err);
                    });
                    archive.on('end', () => {
                        resolve();
                    })
                    
                    archive.pipe(output);
                    archive.directory(`${needZipPath[choose]}/${plugin_name}`, false);
                    archive.finalize();
                })
            }
            await compress();
        }
        const stream = fs.createReadStream(zipName);
        ctx.set({
            'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件  
        })
        ctx.body = stream;
    }
}

module.exports = new PluginController();