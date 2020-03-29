const path = require('path');
const fs = require('fs');
const { copyFile } = require('../../tools/files');

class Axios {
    constructor() {
        this.packageVersion = {
            "axios": "^0.19.2"
        }
    }
    apply(gen) {
        gen.hooks.beforePackageJson.tap('axios', () => {
            const packageJson = gen.defaultPackageJson;
            const dependencies = packageJson.dependencies;
            Object.keys(this.packageVersion).map(name => {
                dependencies[name] = this.packageVersion[name];
            })
        })
        gen.hooks.afterDir.tapAsync('axios', (callback) => {
            copyFile(path.resolve(__dirname, './http.js'), `${gen.rootPath}/src/common/http.js`).then(() => {
                callback();
            })
        })
    }
}

module.exports = Axios;