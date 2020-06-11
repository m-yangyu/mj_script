const path = require('path');
const fs = require('fs');
const { copyFile } = require('../../../tools/files');

class React {
    constructor() {
        this.packageVersion = {
            "mj-script": "1.3.5",
        }
        this.configPath = path.resolve(__dirname, './config')
        this.defaultConfigName = {
            'readme.md': path.resolve(__dirname, './defaultReadme.md'),
        };
    }
    apply(gen) {
        gen.createConfig = true;
        gen.hooks.beforePackageJson.tap('mjScript', () => {
            const packageJson = gen.defaultPackageJson;
            const dev = packageJson.devDependencies;
            Object.keys(this.packageVersion).map(name => {
                dev[name] = this.packageVersion[name];
            })
        })
        gen.hooks.afterRootConfig.tap('mjScript', async () => {
            const rootConfigPath = `${gen.rootPath}/config`;
            if (fs.existsSync(rootConfigPath)) {
                const serverConfigPath = path.resolve(__dirname, './config');
                const fileNames = fs.readdirSync(serverConfigPath);
                fileNames.forEach(async (filename) => {
                    await copyFile(`${serverConfigPath}/${filename}`, `${rootConfigPath}/${filename}`);
                })
            } else {
                await copyFile(this.configPath, rootConfigPath);
            }
            await copyFile(this.defaultConfigName['readme.md'], `${gen.rootPath}/readme.md`);
        })
    }
}

module.exports = React;