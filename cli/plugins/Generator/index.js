const fs = require('fs');
const path = require('path');
const { copyFile, writeFile, mkdir } = require('../../tools/files');
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
} = require('tapable');

class Generator {
    constructor() {
        this.hooks = {
            startGenerator: new SyncHook('startGenerator'),
            endGenerator: new SyncHook('endGenerator'),
            afterCreatePlugin: new SyncHook('afterCreatePlugin'),
            beforePackageJson: new SyncHook('beforePackageJson'),
            afterPackageJson: new AsyncSeriesWaterfallHook('afterPackageJson'),
            afterRootConfig: new SyncHook('afterRootConfig'),
            beforeBabelConfig: new SyncHook('beforeBabelConfig'),
            afterBabelConfig: new AsyncSeriesWaterfallHook('afterBabelConfig'),
            beforeApp: new SyncHook('beforeApp'),
            afterApp: new SyncHook('afterApp'),
            beforeIndex: new SyncHook('beforeIndex'),
            afterIndex: new SyncHook('afterIndex'),
            beforeDir: new SyncHook('beforeDir'),
            afterDir: new AsyncSeriesWaterfallHook('afterDir'),
        }
        this.defaultPackageJson = require('./defaultPackage.json');
        // key: 文件名 ， value: 文件内容
        this.rootPath = '';
        this.createConfig = false;
    }
    createPackageJson = (resolve) => {
        writeFile(`${this.rootPath}/package.json`, JSON.stringify(this.defaultPackageJson, null, '\t'), err => {
            if (err) throw err;
        }).then(() => {
            resolve();
        })
    }
    createRootConfig = (resolve) => {
        if (this.createConfig) {
            mkdir(`${this.rootPath}/config`).then(() => {
                resolve();
            })
        } else {
            resolve();
        }
    }
    createBabelConfig = (resolve) => {
        resolve();
    }
    createDir = (resolve) => {
        resolve();
    }
}

module.exports =  Generator;