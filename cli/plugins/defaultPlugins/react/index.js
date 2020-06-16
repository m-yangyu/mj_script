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

