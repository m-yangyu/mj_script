const path = require('path');
const { writeFile } = require('../../../tools/files');

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
    }
    apply(gen) {
        gen.hooks.beforePackageJson.tap('react', () => {
            const packageJson = gen.defaultPackageJson;
            const dev = packageJson.devDependencies;
            Object.keys(this.packageVersion).map(name => {
                dev[name] = this.packageVersion[name];
            })
        })
        gen.hooks.afterDir.tapAsync('ract', (callback) => {
            writeFile(`${gen.rootPath}/src/app.jsx`, this.defaultApp);
            writeFile(`${gen.rootPath}/src/index.js`, this.defaultIndex.getInfo());
            callback();
        })
    }
}

module.exports = React;