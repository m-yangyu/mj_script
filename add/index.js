const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const { DIR } = require('../config/static/index');
const {
    copyFile,
    hasPath,
    getDirNameByPath,
    mkdir
} = require('../cli/tools/files')

const addNewTemplate = (templateName) => {
    const currentFile = path.resolve(DIR, templateName);
    if (/.js|.ts|.jsx|.tsx|.vue/.test(currentFile)) {
        console.error('只允许上传文件夹，请不要上传单个模板文件');
        return ;
    }
    hasPath(currentFile).then((res) => {
        if (res) {
            const dirName = getDirNameByPath(templateName);
            copyFile(
                currentFile,
                path.resolve(__dirname, `./template/${dirName}`)
            );
        } else {
            console.error('当前文件不存在');
        }
        
    })
}

module.exports = async function() {
    const argvs = this.argvs.keyMap;
    const addTemplate = argvs['-t'] || argvs['--template'];
    if (addTemplate) {
        addNewTemplate(addTemplate);
    } else {
        let templateName = argvs['-s'] || argvs['--select'];
        if (!templateName) {
            const templateArr = fs.readdirSync(path.resolve(__dirname, './template'));
            
            if (!templateArr.length) {
                console.error('请先添加模板');
                return ;
            }

            const op = await inquirer.prompt({
                type: 'list',
                name: 'option',
                message: '请选择模板：',
                choices: templateArr
            })
            templateName = op.option;
        }
        const currentPath = path.resolve(__dirname, `./template/${templateName}`);
        hasPath(currentPath).then(async (res) => {
            if (res) {
                const { dirName } = await inquirer.prompt({
                    type: 'input',
                    name: 'dirName',
                    message: '请输入写入的文件夹路径',
                })
                let rootPath = '';
                if (/.\//.test(dirName)) {
                    rootPath = path.resolve(DIR, dirName);
                }
                const toPath = path.resolve(rootPath, templateName);
                await mkdir(toPath)
                copyFile(
                    currentPath,
                    toPath
                )
            } else {
                console.error('该模板不存在，请先添加');
            }
        })
    }
}