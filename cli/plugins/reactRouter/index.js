const path = require('path');
const { copyFile } = require('../../tools/files');

class ReactRouter {
    constructor() {
        this.packageVersion = {
            "react-router": "^5.1.2",
            "@loadable/component": "^5.12.0",
            "react-router-dom": "^5.1.2"
        }
    }
    apply(gen) {
        gen.hooks.beforePackageJson.tap('router', () => {
            const packageJson = gen.defaultPackageJson;
            const dependencies = packageJson.dependencies;
            Object.keys(this.packageVersion).map(name => {
                dependencies[name] = this.packageVersion[name];
            })
        })
        gen.hooks.afterDir.tapAsync('router', (callback) => {
            copyFile(path.resolve(__dirname, './router'), `${gen.rootPath}/src/router`).then(() => {
                callback();
            });
        })
    }
}

module.exports = ReactRouter;