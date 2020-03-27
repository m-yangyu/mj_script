const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { readCacheOptions, setCacheOptions } = require(`${path.resolve(__dirname, '../localCache')}`);
const { modulesConfig } = require('./configureFiles')

const getInquirerResult = async () => {
    let data = {};
    const cacheOptions = readCacheOptions();
    if (cacheOptions) {
        const op = await inquirer.prompt({
            type: 'list',
            name: 'option',
            message: '请选择缓存的选项：',
            choices: [
                ...Object.keys(cacheOptions),
                'other'
            ]
        })
        if (op.option === 'other') {
            data = getResult();
        } else {
            data = cacheOptions[op.option];
        }
    } else {
        data = getResult();
    }
    return data;
}

const getResult = async () => {
    const moduleOptions = await inquirer.prompt({
        type: 'checkbox',
        name: 'options',
        message: '请选择下面的几种插件：',
        choices: modulesConfig.module
    })

    const isCache = await inquirer.prompt({
        type: 'confirm',
        name: 'cache',
        message: '是否保存当前的选项？',
    })

    let cacheName = {}
    if (isCache.cache) {
        while (!cacheName.name) {
            cacheName = await inquirer.prompt({
                type: 'input',
                name: 'name',
                message: '请输入保存的名称：'
            })
            if (cacheName.name === 'other') {
                console.log(chalk.red('当前名称不可输入，请重新输入'));
                cacheName.name = '';
            }
        }
        setCacheOptions({
            name: cacheName.name,
            module: moduleOptions.options
        })
    }
    return {
        module: moduleOptions.options
    }
}

module.exports = {
    getInquirerResult
}