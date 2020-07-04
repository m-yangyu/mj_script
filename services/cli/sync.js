const fs = require('fs');
const path = require('path');
const ora = require('ora');
const axios = require('axios').default;
const chalk = require('chalk');
const request = require('request');
const decompress = require('decompress');
const config = require('../../serveConfig/config');
const {
    cliPath,
    pluginPath,
    frameworkPath,
} = require('mj-config/static');
const {
    hasPath,
    mkdir
} = require('../../cli/tools/files');
const { getDirPlugins } = require('../utils/utils');

const api = {
    getPlugins: 'getPlugins',
    download: 'download'
}

const needZipPath = {
    plugin: `${cliPath}/cli/plugins/defaultPlugins`,
    framework: `${cliPath}/cli/plugins/framework`,
    addView: `${cliPath}/add/template`
}

const downloadZip = (name, frameworkName, ip, port) => {
    return new Promise(async (resolve, reject) => {
        const dirPath = `${cliPath}/temp/${frameworkName}`;
        const hasTemp = await hasPath(dirPath);
        if (!hasTemp){
            await mkdir(dirPath)
        }
        const zipPath = `${dirPath}/${name}.zip`;
        const stream = fs.createWriteStream(zipPath);
        request(`http://${ip}:${port}/${api.download}/${frameworkName}?plugin_name=${name}`).pipe(stream).on('finish', () => {
            decompress(zipPath, `${needZipPath[frameworkName]}/${name}`);
            resolve();
        }).on('error', (err) => {
            reject(err);
        });
    })
}

const getOriginPlugins = function() {
    const argv = this.argvs.keyMap;
    let {
        ip,
        port
    } = config;
    if (argv['-ip']) {
        ip = argv['-ip'];
    }
    if (argv['-port']) {
        port = argv['-port'];
    }
    const spinner = ora({
        text: '正在拉取服务端数据',
        discardStdin: false
    }).start();
    axios.get(`http://${ip}:${port}/${api.getPlugins}`).then(async (res) => {
        const { data } = res;
        if (data) {
            const plugins = await getDirPlugins(pluginPath);
            const framework = await getDirPlugins(frameworkPath);
            const addView = await getDirPlugins(`${cliPath}/add/template`);
            const {
                pluginsDir,
                frameworkDir,
                addViewDir
            } = data;
            const getPlugin = async (pluginArr, localPluginArr, pluginTemplateName) => {
                const newPluginArr = pluginArr.filter((name) => !localPluginArr.includes(name));
                newPluginArr.forEach(async (name) => {
                    spinner.text = `download ${name} ${pluginTemplateName}`;
                    await downloadZip(name, pluginTemplateName, ip, port);
                })
            }
            await getPlugin(pluginsDir, plugins, 'plugin');
            await getPlugin(frameworkDir, framework, 'framework');
            await getPlugin(addViewDir, addView, 'addView');
            
            spinner.succeed('拉取完成');
        }
    }).catch((err) => {
        spinner.fail('请求失败');
        console.log(chalk.red(err));
    })
}

module.exports = getOriginPlugins;