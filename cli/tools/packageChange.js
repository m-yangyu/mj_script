const fs = require('fs');
const { modulesConfig } = require('./configureFiles');

const changeByOptions = (path, delOptions) => {
    const json = JSON.parse(fs.readFileSync(path, {encoding: 'utf-8'}));
    // 处理开发依赖
    json.devDependencies = deleteOptions(json.devDependencies, delOptions);
    json.dependencies = deleteOptions(json.dependencies, delOptions);
    // 处理preCommit, 不存在删除列表里，就写入
    json['pre-commit'] = [];
    !delOptions.includes('jest') && json['pre-commit'].push('test');
    !delOptions.includes('eslint') && json['pre-commit'].push('lint');
    // 处理script, 存在删除列表中就删除
    delOptions.includes('jest') && delete json.scripts.test;
    delOptions.includes('eslint') && delete json.scripts.lint;

    return json;
}

const deleteOptions = (json, option) => {
    const keys = Object.keys(json);
    keys.map(key => {
        if (option.filter(op => ~key.indexOf(op)).length) {
            delete json[key];
        }
    })
    return json;
}

module.exports = {
    changeByOptions
}