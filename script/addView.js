const fs = require('fs');
const { viewDIR } = require('../static/index');
const getTemplate = require('../template/reactTpl');
const inquirer = require('inquirer');

const getAnswer = async (options) => {
    const { name } = options;
    return (await inquirer.prompt(options))[name];
}

const errCallback = err => {
    if (err) throw err;
}

module.exports = async function() {

    let name = '';

    while(!name || fs.existsSync(`${viewDIR}/${name}`)) {

        if (name) {
            console.log('文件名已存在，请重新输入');
        }

        name = await getAnswer({
            name: 'name',
            type: 'input',
            message: '请输入新增的文件夹名称'
        })
    }

    const type = await getAnswer({
        type: 'list',
        name: 'type',
        message: '请选择要创建的react模板：',
        choices: ['class', 'hook']
    });

    const style = await getAnswer({
        type: 'list',
        name: 'style',
        message: '请选择要使用的预编译器：',
        choices: ['less', 'scss']
    })

    const template = getTemplate(type, name, style);
    const dirPath = `${viewDIR}/${name}`;
    fs.mkdir(dirPath, { recursive: true }, err => {
        if (err) throw err;

        fs.writeFile(`${dirPath}/index.jsx`, template, errCallback);
        fs.writeFile(`${dirPath}/index.module.${style}`, '', errCallback);
    })
}