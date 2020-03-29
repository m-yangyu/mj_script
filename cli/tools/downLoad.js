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
const modulesLoad = require('../plugins');

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
// 使用了3种不同的方法，最终确认使用现在第三种下载模式
// 1. 借用git进行下载
// 2. 直接copy本地项目
// 3. 将本地项目模块化，使用tapable的钩子的模式，进行模块的构建
const downLoad = async (options, url, renameParam) => {
    const { module } = options;
    
    modulesLoad(module, renameParam);
}

module.exports = {
    downLoad,
    downLoadGit
}
