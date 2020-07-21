const fs = require('fs');
const path = require('path');
const fsE = require('fs-extra');

export const copyFile = (currentPath, toPath) => {
    return new Promise((resolve, reject) => {
        fsE.copy(currentPath, toPath, err => {
            if (err) reject(err);
            resolve();
        })
    })
}

export const writeFile = (url, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(url, data, err => {
            if (err) reject(err)
            resolve();
        })
    })
}

export const mkdir = (path) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, { recursive: true }, err => {
            if (err) reject(err);
            resolve();
        })
    })
}

export const emptyDir = (path) => {
    return fsE.emptyDir(path);
}

export const getDirNameByPath = (path) => {
    let currentDirNameArr = path.split('/');
    if (~path.indexOf('\\')) {
        currentDirNameArr = path.split('\\');
    }
    return currentDirNameArr[currentDirNameArr.length - 1];
}

export const hasPath = (path) => {
    return fsE.pathExists(path);
}

export const readFilesStream = (path) => {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(path);
        let data = '';
        stream.on('data', (chunk) => {
            data += chunk;
        })
        stream.on('end', (err) => {
            if (err) reject(err)
            resolve(data);
        })
    })
}

// module.exports = {
//     copyFile,
//     writeFile,
//     mkdir,
//     emptyDir,
//     getDirNameByPath,
//     hasPath,
//     readFilesStream
// }