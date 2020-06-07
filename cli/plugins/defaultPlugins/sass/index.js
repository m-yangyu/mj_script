const { getPromiseFunc } = require('../../../tools/utils');
const { copyFile, writeFile, mkdir } = require('../../../tools/files');

class Sass {
    constructor() {
        this.sassLoaderVersion = '5.0.0';
        this.sassResourcesLoader = '2.0.1';
        this.nodeSass =  '4.13.1'; 
    }
    apply(gen) {
        gen.hooks.beforePackageJson.tap('sass', () => {
            const packageJson = gen.defaultPackageJson;
            const dev = packageJson.devDependencies;
            dev['node-sass'] = this.nodeSass;
            dev['sass-loader'] = this.sassLoaderVersion;
            dev['sass-resources-loader'] = this.sassResourcesLoader;
        })
        gen.hooks.beforeDir.tap('sass', async () => {
            await mkdir(`${gen.rootPath}/style`);
            await writeFile(`${gen.rootPath}/style/common.scss`, '');
        })
    }
}

module.exports = Sass;