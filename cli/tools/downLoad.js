const {spawn} = require('child_process');
const fs = require('fs');
const path = require('path');
const fsE = require('fs-extra');
const ora = require('ora');
const rimraf = require('rimraf');
const chalk = require('chalk');
const { 
    changeByOptions
} = require('./packageChange')
const configureFiles = require('./configureFiles');
const { DIR } = require('../../config/static');

const { getDelConfig } = configureFiles;
const getProgramName = (url) => {
    const urlArr = url.split('/');
    const lastName = urlArr[urlArr.length - 1].split('.')[0];
    return lastName;
}

// 下载方法
// 本质上是调用git clone把远程库给安装到本地
const downLoadGit = (url, renameParam) => {
    return new Promise((resolve, reject) => {
        const curName = renameParam || getProgramName(url);
        const spinner = ora({
            text: '正在下载',
            discardStdin: false
        }).start();
        const git = spawn('git', [
            'clone',
            url,
            curName
        ])

        git.on('error', (err) => {
            reject(err);
        })

        git.on('close', (err, code) => {
            rimraf(`./${curName}/.git`, () => {
                spinner.succeed('下载完成');
                resolve(curName);
            })
        });
    })
}

const copyLoad = (renameParam) => {
    return new Promise(resolve => {
        const spinner = ora({
            text: '正在下载',
            discardStdin: false
        }).start();
        const name = renameParam || 'react_template';
        fsE.copy(path.resolve(__dirname, '../../react'), `${DIR}/${name}`).then(res => {
            spinner.succeed('下载完成');
            resolve(name);
        }).catch(e => {
            reject(e);
        })
    })
}

const downLoad = async (options, url, renameParam) => {
    const { css, module, react } = options;
    
    const dirName = await copyLoad(renameParam);
    if (dirName) {
        const spinner = ora({
            text: '正在安装配置',
            discardStdin: false
        }).start();
        try {
            // 配置packagejson
            const packagePath = `./${dirName}/package.json`;
            const delConfig = getDelConfig([
                ...module
            ]);
            const newJson = changeByOptions(packagePath, delConfig);

            fs.writeFileSync(packagePath, JSON.stringify(newJson, null, 4));
            // 配置相应的文件
            configureFiles(`./${dirName}`, delConfig);
            spinner.succeed('安装完成');
        } catch(err) {
            spinner.fail(`安装失败：\n ${chalk.red(err)}`);
        }
    }
}

module.exports = {
    downLoad,
    downLoadGit
}
