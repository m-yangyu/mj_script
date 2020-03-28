const path = require('path');
const fs = require('fs');
const fsE = require('fs-extra');
const { copyFile, writeFile, mkdir } = require('../tools/files');
const Generator = require('./Generator');

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

const modulesLoad = async (options) => {

    const gen = createGenerator();
    createPlugins(gen, ['less']);

    gen.hooks.startGenerator.call();
    // 生成packageJSON
    // 生成根目录配置文件
    // 生成babel
    // 生成template文件夹（html）
    // 生成config配置文件（直接复制，不写入）
    // 生成src
    //      - 生成app.jsx
    //      - 生成index.js
    //      - 生成src目录表级别文件夹(common, components, assets)
    //      - 生成view
    //      - 生成style文件夹

}
modulesLoad();

module.exports = modulesLoad;