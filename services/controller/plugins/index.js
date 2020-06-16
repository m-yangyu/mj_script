const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const {
    pluginsPath,
    frameworkPath
} = require('../../config');
const {
    readFilesStream
} = require('../../../cli/tools/files');

class PluginController {
    constructor() {

    }
    getPlugins(ctx) {
        const pluginsDir = fs.readdirSync(pluginsPath);
        const frameworkDir = fs.readdirSync(frameworkPath);
        ctx.body = {
            pluginsDir,
            frameworkDir
        }
    }
    async downLoadPlugin(ctx) {
        const { plugin_name = ''} = ctx.query;
        if (!plugin_name) {
            ctx.throw('插件名称必须填写');
        }
        const zipName = `./pluginsZip/${plugin_name}.zip`;
        if (!fs.existsSync(zipName)) {
            const output = fs.createWriteStream(zipName);
            const archive = archiver('zip');
            archive.on('error', function(err){
                throw err;
            });
            
            archive.pipe(output);
            archive.directory(`${pluginsPath}/${plugin_name}`, false);
            archive.finalize();
        }
        
        // const data = fs.readFileSync(zipName);
        const stream = fs.createReadStream(zipName);
        // let data = await readFilesStream(zipName);
        // const wStream = fs.createWriteStream('test111.zip');
        // stream.pipe(wStream);
        // const stream = fs.createWriteStream(`antd.zip`);
        // stream.write(data);
        // fs.writeFileSync('test11111.zip', data);
        ctx.set({
            'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件  
        })
        ctx.body = stream;
    }
}

module.exports = new PluginController();