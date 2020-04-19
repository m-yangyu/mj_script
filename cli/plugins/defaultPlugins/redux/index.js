const path = require('path');
const { copyFile } = require('../../tools/files');

class Redux {
    constructor() {
        this.packageVersion = {
            "redux": "^4.0.5",
            "redux-actions": "^2.6.5",
            "redux-devtools-extension": "^2.13.8",
            "redux-thunk": "^2.3.0",
            "react-redux": "^7.2.0"
        }
    }
    apply(gen) {
        gen.hooks.beforePackageJson.tap('redux', () => {
            const packageJson = gen.defaultPackageJson;
            const dependencies = packageJson.dependencies;
            Object.keys(this.packageVersion).map(name => {
                dependencies[name] = this.packageVersion[name];
            })
        })
        gen.hooks.afterDir.tapAsync('redux', (callback) => {
            copyFile(path.resolve(__dirname, './redux'), `${gen.rootPath}/src/redux`).then(() => {
                callback();
            });
        })
    }
}

module.exports = Redux;