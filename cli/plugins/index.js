// const { mkdir } = require('../tools/files');
// const { getPromiseFunc } = require('../tools/utils');
// const { DIR } = require('mj-config/static');
// const Generator = require('./Generator');
// const ora = require('ora');

import { mkdir } from '../tools/files';
import { getPromiseFunc } from '../tools/utils';
import { DIR } from 'mj-config/static';
import Generator from './Generator/index';
import ora from 'ora';

const modulesNameArr = [
    'PackageJson',
    'RootConfig',
    'BabelConfig',
    'Dir',
]
const callMap = {
    afterPackageJson: 'callAsync',
    afterDir: 'callAsync',
    afterBabelConfig: 'callAsync'
}

const createGenerator = () => {
    return new Generator()
}

const createPlugins = (gen, options) => {
    options.map(name => {
        try {
            require(`./defaultPlugins/${name}`).apply(gen);
        } catch (e){
            const plugin = new (require(`./defaultPlugins/${name}`));
            plugin.apply(gen);
        }
    })
    gen.hooks.afterCreatePlugin.call();
}



const doneFunc = async (gen, name) => {
    const beforeName = `before${name}`;
    const afterName = `after${name}`;
    gen.hooks[beforeName] && gen.hooks[beforeName][callMap[beforeName] || 'call']();
    return getPromiseFunc(gen[`create${name}`])().then(() => {
        if (callMap[afterName]) {
            gen.hooks[afterName][callMap[afterName]](err => {
                if (err) throw err;
            });
        } else {
            gen.hooks[afterName].call();
        }
    })
}

export default modulesLoad = async (options, renameParam) => {

    const gen = createGenerator();
    const rootPath = `${DIR}/${renameParam || 'template'}`;
    gen.rootPath = rootPath;
    const spinner = ora({
        text: '正在下载',
        discardStdin: false
    }).start();
    createPlugins(gen, options);
    gen.hooks.startGenerator.call();
    await mkdir(rootPath)
    modulesNameArr.map(async name => {
        await doneFunc(gen, name);
    })
    spinner.succeed('下载完成');
}

// module.exports = modulesLoad;