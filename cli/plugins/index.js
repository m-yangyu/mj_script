const path = require('path');
const fs = require('fs');
const fsE = require('fs-extra');
const { copyFile, writeFile, mkdir } = require('../tools/files');
const { getPromiseFunc } = require('../tools/utils');
const { DIR } = require('../../config/static');
const Generator = require('./Generator');

const modulesNameArr = [
    'PackageJson',
    'RootConfig',
    'BabelConfig',
    'Template',
    'Dir',
    'App',
    'Index'
]
const callMap = {
    afterPackageJson: 'callAsync',
    afterDir: 'callAsync'
}

const createGenerator = () => {
    return new Generator()
}

const createPlugins = (gen, options) => {
    options.map(name => {
        try {
            require(`./${name}`).apply(gen);
        } catch (e){
            const plugin = new (require(`./${name}`));
            plugin.apply(gen);
        }
    })
    gen.hooks.afterCreatePlugin.call();
}

const doneFunc = (gen, name) => {
    const beforeName = `before${name}`;
    const afterName = `after${name}`;
    gen.hooks[beforeName] && gen.hooks[beforeName][callMap[beforeName] || 'call']();
    getPromiseFunc(gen[`create${name}`])().then(() => {
        if (callMap[afterName] === 'callAsync') {
            gen.hooks[afterName][callMap[afterName] || 'call'](err => {
                if (err) throw err;
            });
        }
        
    })
}

const modulesLoad = async (options, renameParam) => {

    const gen = createGenerator();
    const rootPath = `${DIR}/${renameParam || 'react'}`;
    gen.rootPath = rootPath;
    createPlugins(gen, ['less', 'sass', 'antd', 'axios', 'eslint', 'jest', 'reactRouter', 'redux']);

    gen.hooks.startGenerator.call();
    await mkdir(rootPath)
    modulesNameArr.map(async name => {
        await doneFunc(gen, name);
    })
}
modulesLoad();

module.exports = modulesLoad;