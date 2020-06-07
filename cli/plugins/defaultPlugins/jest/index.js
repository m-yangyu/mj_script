const path = require('path');
const { copyFile } = require('../../../tools/files');

class Jest {
    constructor() {
        this.packageVersion = {
            "babel-jest": "24.9.0",
            "jest": "24.9.0"
        }
        this.scripts = {
            "test": "jest --passWithNoTests",
        }
        this.preCommit = "test";
    }
    apply(gen) {
        gen.hooks.beforePackageJson.tap('jest', () => {
            const packageJson = gen.defaultPackageJson;
            const dev = packageJson.devDependencies;
            const scripts = packageJson.scripts;
            Object.keys(this.packageVersion).map(name => {
                dev[name] = this.packageVersion[name];
            })
            Object.keys(this.scripts).map(name => {
                scripts[name] = this.scripts[name]
            })
            packageJson['pre-commit'].push(this.preCommit);
        })
        gen.hooks.afterRootConfig.tap('jest', () => {
            copyFile(path.resolve(__dirname, './jest.config.js'), `${gen.rootPath}/jest.config.js`);
        })
    }
}

module.exports = Jest;