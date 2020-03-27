#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const argvStore = require('argv_store');
const devServer = require('./devServer');
const build = require('./build');
const addView = require('./add');
const deploy = require('./deploy');
const dll = require('./dll');
const reactInit = require('./cli');

const program = new argvStore();

const readFileSync = (url) => {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, url)).toString());
}

const packageJson = readFileSync('./package.json');

program
    .version(packageJson.version)
    .command('build', '构建', build)
    .command('build:pre', '预生产', () => build({isPre: true}))
    .command('dev', '开发', devServer)
    .command('analyz', '分析', () => build({isAnalyz: true}))
    .command('add', '添加新页面', addView)
    .command('deploy', '部署', deploy)
    .command('build:lib', 'dll文件构建', dll)
    .command('create', '初始化', reactInit)
    .options('-r --rename', '[yourname] 重命名')
    .parse();