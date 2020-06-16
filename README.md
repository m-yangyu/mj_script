# mj-script

mj-script是一个集构建，打包，发布，脚本命令为一体的一个脚手架包，提供除基本构建以外的能力

## 创建脚手架

`mj-script create`

`mj-script create -r [yourName]`

在mj-script默认的脚手架中，存放了一套基于react，redux，react-router的脚手架，提供基础的开发，生产，预生产打包能力，可依据自己个人的选择去挑选对应的额外能力

添加-r命令的话， 是可以重新定制生成的文件夹名

### 运行命令

运行上述命令之后， 会出现一个选择之前是否存放的模板页面，如果不想使用之前保存的配置，可选择other

如果选择了other， 则会出现选择framework窗口, default是默认存在的，内部包含了

1. antd
2. axios
3. exlint
4. jest
5. reactRouter
6. redux
7. react
8. mjScript

当然, 你还可以不选择使用default, 而是用自己生成的内容, 选择other即可, 这时候会提示让你选择其他插件, 如果没有选择framework, 则会将当前的所有插件列表显示在界面上(插件后续再讲)

选择结束即可开始构建， 构建过程是在本地进行拷贝的过程， 所以速度上来讲不会比较慢，也没有网络影响

## 构建能力

增加了基础构建能力， 原在内部直接存在的代码， 脱离生成了一个mjScript插件，包含了以下内容

1. build
2. pre-build
3. dev
4. depoly
5. analyz
6. build:lib

提供了基础能力， depoly的能力还有欠缺， 只能提供基础的上传能力， 没法进行项目管理以及项目迭代

## 添加页面

提供了页面模板维护的能力，即可以讲当前的页面模板直接上传至总包地方，通过命令下载对应的模板

### 添加页面模板

`mj-script add -t [yourDirPath]`

path必须是一个文件夹， 不存放单纯的文件， 如果存在文件可能会报错，暂时还没有发现这个问题， 在内部会将文件内容处理，但是只存在一部分类型的文件，没有针对所有文件进行处理

### 生成页面

`mj-script add -s [yourTemplateName]`

`mj-script add`

生成页面的方法有两种模式， 如果加上-s是可以直接进行安装， 不需要在选择对应的模板页面

## 添加framework

`mj-script addPlugins -m framework -c [dirPath]`

framework是最简单的一个模块， 只是单纯的一个数组集合，内部存放的是各个插件的内容，例如default也是一个framework，他内部存在的是

``` javascript

module.exports = [
    'antd',
    'axios',
    'eslint',
    'jest',
    'reactRouter',
    'redux',
    'react',
    'mjScript'
]

```

## 添加plugins

[插件系统说明](https://github.com/HuskyToMa/mj_script/tree/master/cli)

插件系统是整个项目最为核心的内容， 基于`webpack`的核心模块`tapable`来实现

### plugin是什么

上述framework导出的每个字符串都对应一个相应的插件，即framework实际上是导出一个插件的集合， 而插件是生成项目代码的基础

### 创建一个plugin

`mj-script addPlugins -c [dirPath]`

首先， 在创建过程中，提供了10个钩子

1. startGenerator
2. endGenerator
3. afterCreatePlugin
4. beforePackageJson
5. afterPackageJson
6. afterRootConfig
7. beforeBabelConfig
8. afterBabelConfig
9. beforeDir
10. afterDir

before的钩子，尽量不要使用有副作用的方法， 因为暂时部分的插件，在使用过程中，before跟after的调用时间可能忽略不计

其中3个钩子使用的是AsyncSeriesWaterfallHook，其余都是SyncHook

3个特殊钩子

1. afterPackageJson
2. afterBabelConfig
3. afterDir

一个react的插件示例

``` javascript

const path = require('path');
const {
    writeFile,
    mkdir,
    copyFile
} = require('../../../tools/files');

class React {
    constructor() {
        this.packageVersion = {
            "@hot-loader/react-dom": "16.12.0",
            "react": "16.13.0",
            "react-dom": "16.13.0",
            "react-hot-loader": "4.12.19"
        }
        this.defaultApp = require('./src/app.js')();
        this.defaultIndex = require('./src/index')();
        this.defaultBabelConfig = require('./defaultBabel');
        this.defaultTemplate = path.resolve(__dirname, './template');
    }
    // gen是一个构件类， 内部有很多钩子，以及一些构建的时候触发的控制器
    apply(gen) {
        gen.hooks.beforePackageJson.tap('react', () => {
            const packageJson = gen.defaultPackageJson;
            const dev = packageJson.devDependencies;
            Object.keys(this.packageVersion).map(name => {
                dev[name] = this.packageVersion[name];
            })
        })
        gen.hooks.afterPackageJson.tapAsync('react', (callback) => {
            copyFile(this.defaultTemplate, `${gen.rootPath}/template`).then(() => {
                callback();
            })
        })
        gen.hooks.beforeDir.tap('react', async () => {
            await mkdir(`${gen.rootPath}/src`);
            await mkdir(`${gen.rootPath}/src/common`);
            await copyFile(path.resolve(__dirname, './src/components'), `${gen.rootPath}/src/components`);
            await copyFile(path.resolve(__dirname, './src/assets'), `${gen.rootPath}/src/assets`);
        })
        gen.hooks.afterDir.tapAsync('react', (callback) => {
            writeFile(`${gen.rootPath}/src/app.jsx`, this.defaultApp);
            writeFile(`${gen.rootPath}/src/index.js`, this.defaultIndex.getInfo());
            callback();
        })
        gen.hooks.afterBabelConfig.tapAsync('react', (callback) => {
            const babelStr = `module.exports = ${JSON.stringify(this.defaultBabelConfig, null, '\t')}`;
            writeFile(`${gen.rootPath}/babel.config.js`, babelStr).then(() => {
                callback();
            })
        })
    }
}

module.exports = React;

```