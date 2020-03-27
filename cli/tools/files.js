const fs = require('fs');
const path = require('path');
const fsE = require('fs-extra');

export const copyFile = (currentPath, toPath) => {
    return new Promise((resolve, reject) => {
        fsE.copy(currentPath, toPath).then(res => {
            resolve();
        }).catch(e => {
            reject(e);
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

export const mkdir = () => {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, { recursive: true }, err => {
            if (err) reject(err);
            resolve();
        })
    })
}