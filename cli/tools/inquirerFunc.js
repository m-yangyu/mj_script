const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { readCacheOptions, setCacheOptions } = require(`${path.resolve(__dirname, '../localCache')}`);
const { modulesConfig, filterModules } = require('./configureFiles')

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
        type: 'list',
        name: 'options',
        message: '请选择下面的几种框架：',
        choices: modulesConfig.framework
    })

    const otherModule = filterModules(moduleOptions.options);
    const otherOptions = await inquirer.prompt({
        type: 'checkbox',
        name: 'options',
        message: '请选择其他模块',
        choices: otherModule
    });

    const isCache = await inquirer.prompt({
        type: 'confirm',
        name: 'cache',
        message: '是否保存当前的选项？',
    })

    let cacheName = {}
    const options = [
        ...(
            moduleOptions.options !== 'other' ? 
            require(path.resolve(__dirname, `../plugins/framework/${moduleOptions.options}`)) :
            []
        ),
        ...otherOptions.options
    ]
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
            module: options
        })
    }
    return {
        module: options
    }
}

module.exports = {
    getInquirerResult
}