const path = require('path');
const { copyFile } = require('../../tools/files');

class Jest {
    constructor() {
        this.packageVersion = {
            "@hot-loader/react-dom": "^16.12.0",
            "react": "^16.13.0",
            "react-dom": "^16.13.0",
            "react-hot-loader": "^4.12.19"
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