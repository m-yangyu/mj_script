// const path = require('path');
// const ora = require('ora');
// const {
//     downLoadGit,
//     getProgramName
// } = require('../tools/downLoad');
// const {
//     copyFile
// } = require('../tools/files')
import path from 'path';
import ora from 'ora';
import {
    downLoadGit,
    getProgramName
} from '../tools/downLoad';
import { copyFile } from '../tools/files';

const downLoadByUrl = (argvs, saveDirName) => {
    const url = argvs['-u'] || argvs['--url'];
    if (url) {
        downLoadGit(
            url,
            name || getProgramName(url),
            path.resolve(__dirname, `../plugins/${saveDirName}`)
        );
    } else {
        downLoadByNpm(argvs, saveDirName);
    }
}

const downLoadByNpm = (argvs, saveDirName) => {
    const npmName = argvs['-n'] || argvs['--npm'];
    if (npmName) {
        console.error('暂不支持通过npm添加');
    } else {
        downLoadByCurrent(argvs, saveDirName);
    }
}

const downLoadByCurrent = (argvs, saveDirName) => {
    const currentDir = argvs['-c'] || argvs['--current'] || '';
    const rootPath = process.cwd();
    // 当前目录地址
    const currentDirPath = path.resolve(rootPath, currentDir);
    let currentDirNameArr = currentDirPath.split('/');
    if (~currentDirPath.indexOf('\\')) {
        currentDirNameArr = currentDirPath.split('\\');
    }
    const currentDirName = currentDirNameArr[currentDirNameArr.length - 1];
    copyFile(
        currentDirPath, 
        path.resolve(__dirname, `../plugins/${saveDirName}/${currentDirName}`)
    );
}

export default function() {
    const argvs = this.argvs.keyMap;
    const methods = argvs['-m'] || argvs['--methods'];

    let saveDirName = 'defaultPlugins';

    if (methods === 'framework') {
        saveDirName = 'framework';
    }
    const spinner = ora({
        text: '正在安装',
        discardStdin: false
    }).start();
    downLoadByUrl(argvs, saveDirName);
    spinner.succeed('安装完成');
}