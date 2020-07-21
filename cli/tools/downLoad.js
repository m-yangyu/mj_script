// const {spawn} = require('child_process');
// const path = require('path');
// const fsE = require('fs-extra');
// const ora = require('ora');
// const rimraf = require('rimraf');
// const configureFiles = require('./configureFiles');
// const { DIR } = require('mj-config/static');
// const modulesLoad = require('../plugins');

import { spawn } from 'child_process';
import path from 'path';
import fsE from 'fs-extra';
import ora from 'ora';
import rimraf from 'rimraf';
import configureFiles from './configureFiles';
import { DIR } from 'mj-config/static';
import modulesLoad from '../plugins/index';

const { getDelConfig } = configureFiles;
export const getProgramName = (url) => {
    const urlArr = url.split('/');
    const lastName = urlArr[urlArr.length - 1].split('.')[0];
    return lastName;
}

// 下载方法
// 本质上是调用git clone把远程库给安装到本地
export const downLoadGit = (url, renameParam, cwd = __dirname) => {
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
        ], {
            cwd
        })

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

export const copyLoad = (renameParam) => {
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
export const downLoad = async (options, renameParam) => {
    const { module } = options;
    
    modulesLoad(module, renameParam);
}

// module.exports = {
//     downLoad,
//     downLoadGit,
//     getProgramName
// }
