const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');

const plugins = fs.readdirSync(path.resolve(__dirname, '../plugins/defaultPlugins'));
const FrameWork = fs.readdirSync(path.resolve(__dirname, '../plugins/framework'));

export const modulesConfig = {
    module: plugins,
    framework: [
        ...FrameWork,
        'other'
    ]
}

export const filterModules = (frameworkName) => {
    const frameworkDir = path.resolve(__dirname, `../plugins/framework/${frameworkName}`);
    if (!fs.existsSync(frameworkDir)) {
        return plugins;
    }
    const options = require(frameworkDir);
    return plugins.filter(name => !options.includes(name));
}

const rm = (filePath) => {
    rimraf(filePath, (err) => {
        if (err) console.log(err);
    })
}

// 配置文件的方法，如果调用到callback将会从源代码中删除对应模块
const configure = {
    path: '',
    eslint: {
        use: true,
        callback: function() {
            rm(`${this.path}/.eslintrc.js`);
        }
    },
    jest: {
        use: true,
        callback: function() {
            rm(`${this.path}/jest.config.js`);
            rm(`${this.path}/test`);
        }
    },
}

const run = () => {
    const keys = Object.keys(configure);
    // 没有使用的模块需要删除对应的代码文件
    keys.map(key => {
        !configure[key].use && 
        typeof configure[key].use === 'boolean' &&
        configure[key].callback.call(configure);
    })   
}

export default configureFiles = (dirPath, config) => {
    configure.path = dirPath;
    // 设置模块的使用情况
    config.map(name => {
        configure[name].use = false;
    })
    run();
}

export const getDelConfig = (need) => {
    const all = [
        ...modulesConfig.module
    ]
    return all.filter(item => !need.includes(item));
}

// module.exports = configureFiles;
// module.exports.modulesConfig = modulesConfig;
// module.exports.getDelConfig = getDelConfig;
// module.exports.filterModules = filterModules;