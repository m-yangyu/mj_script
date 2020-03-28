const fs = require('fs');
const path = require('path');
const fsE = require('fs-extra');

const copyFile = (currentPath, toPath) => {
    return new Promise((resolve, reject) => {
        fsE.copy(currentPath, toPath, err => {
            if (err) reject(err);
            resolve();
        })
    })
}

const writeFile = (url, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(url, data, err => {
            if (err) reject(err)
            resolve();
        })
    })
}

const mkdir = (path) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, { recursive: true }, err => {
            if (err) reject(err);
            resolve();
        })
    })
}

module.exports = {
    copyFile,
    writeFile,
    mkdir
}