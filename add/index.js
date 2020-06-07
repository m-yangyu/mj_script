const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const { DIR } = require('../config/static/index');
const {
    copyFile
} = require('../cli/tools/files')

const addNewTemplate = (templateName) => {
    const currentFile = path.resolve(DIR, templateName);
    if (fs.existsSync(currentFile)) {
        copyFile(
            currentFile,
            path.resolve(__dirname, `./template/${templateName}`)
        );
    } else {
        console.error('当前文件不存在');
    }
}

module.exports = async function() {
    const argvs = this.argvs.keyMap;
    const addTemplate = argvs['-t'] || argvs['--template'];
    if (addTemplate) {
        addNewTemplate(addTemplate);
    } else {
        const templateArr = fs.readdirSync(path.resolve(__dirname, './template'));
        const op = await inquirer.prompt({
            type: 'list',
            name: 'option',
            message: '请选择缓存的选项：',
            choices: templateArr
        })
        console.log(op.option);
    }
}