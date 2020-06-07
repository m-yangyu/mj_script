const { copyFile, writeFile, mkdir } = require('../../../tools/files');

class Less {
    constructor() {
        this.lessVersion = '3.11.1'
        this.lessLoaderVersion = '5.0.0'
        this.sassResourcesLoader = '2.0.1';
    }
    apply(gen) {
        gen.hooks.beforePackageJson.tap('less', () => {
            const packageJson = gen.defaultPackageJson;
            const dev = packageJson.devDependencies;
            dev.less = this.lessVersion;
            dev['sass-resources-loader'] = this.sassResourcesLoader;
            dev['less-loader'] = this.lessLoaderVersion;
        })
        gen.hooks.beforeDir.tap('less', async () => {
            await mkdir(`${gen.rootPath}/style`);
            await writeFile(`${gen.rootPath}/style/common.less`, '');
        })
    }
}

module.exports = Less;