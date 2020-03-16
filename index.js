#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const argvStore = require('argv_store');
const devServer = require(path.resolve(__dirname, './script/devServer'));
const build = require(path.resolve(__dirname, './script/build'));
const addView = require('./script/addView');
const deploy = require('./script/deploy');

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
    .parse();