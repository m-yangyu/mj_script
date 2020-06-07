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
            afterBabelConfig: new SyncHook('afterBabelConfig'),
            beforeTemplate: new SyncHook('beforeTemplate'),
            afterTemplate: new SyncHook('afterTemplate'),
            beforeApp: new SyncHook('beforeApp'),
            afterApp: new SyncHook('afterApp'),
            beforeIndex: new SyncHook('beforeIndex'),
            afterIndex: new SyncHook('afterIndex'),
            beforeDir: new SyncHook('beforeDir'),
            afterDir: new AsyncSeriesWaterfallHook('afterDir'),
        }
        this.defaultPackageJson = require('./defaultPackage.json');
        // key: 文件名 ， value: 文件内容
        this.defaultConfigName = {
            'readme.md': path.resolve(__dirname, './defaultReadme.md'),
            'config': path.resolve(__dirname, './config')
        };
        this.defaultBabelConfig = require('./defaultBabel');
        this.defaultTemplate = {
            'index.tpl.ejs': path.resolve(__dirname, './template/index.tpl.ejs')
        };
        // this.defaultApp = require('./src/app.js')();
        // this.defaultIndex = require('./src/index')();
        this.rootPath = '';
    }

    createPackageJson = (resolve, reject) => {
        writeFile(`${this.rootPath}/package.json`, JSON.stringify(this.defaultPackageJson, null, '\t'), err => {
            if (err) throw err;
            resolve();
        })
    }
    createRootConfig = async (resolve, reject) => {
        await copyFile(this.defaultConfigName['readme.md'], `${this.rootPath}/readme.md`);
        await copyFile(this.defaultConfigName.config, `${this.rootPath}/config`);
        resolve();
    }
    createBabelConfig = (resolve, reject) => {
        const babelStr = `module.exports = ${JSON.stringify(this.defaultBabelConfig, null, '\t')}`;
        writeFile(`${this.rootPath}/babel.config.js`, babelStr).then(() => {
            resolve();
        })
    }
    createTemplate = async (resolve, reject) => {
        await mkdir(`${this.rootPath}/template`);
        Object.keys(this.defaultTemplate).map(async name => {
            await copyFile(this.defaultTemplate[name], `${this.rootPath}/template/${name}`);
        })
        resolve();
    }
    createDir = async (resolve, reject) => {
        await mkdir(`${this.rootPath}/src`);
        // await copyFile(path.resolve(__dirname, './src/common'), `${this.rootPath}/src/common`);
        await mkdir(`${this.rootPath}/src/common`);
        await copyFile(path.resolve(__dirname, './src/components'), `${this.rootPath}/src/components`);
        await copyFile(path.resolve(__dirname, './src/assets'), `${this.rootPath}/src/assets`);
        resolve();
    }
    // createApp = (resolve, reject) => {
    //     writeFile(`${this.rootPath}/src/app.jsx`, this.defaultApp).then(() => {
    //         resolve();
    //     })
    // }
    // createIndex = (resolve, reject) => {
    //     writeFile(`${this.rootPath}/src/index.js`, this.defaultIndex.getInfo()).then(() => {
    //         resolve();
    //     })
    // }
}

module.exports =  Generator;