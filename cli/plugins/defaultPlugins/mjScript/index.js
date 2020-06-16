const path = require('path');
const fs = require('fs');
const { copyFile } = require('../../../tools/files');

class React {
    constructor() {
        this.packageVersion = {
            "mj-script": "1.3.5",
            "@babel/core": "7.8.4",
            "@babel/plugin-proposal-class-properties": "7.8.3",
            "@babel/plugin-proposal-decorators": "7.8.3",
            "@babel/plugin-transform-runtime": "7.8.3",
            "@babel/preset-env": "7.8.4",
            "@babel/preset-react": "7.8.3",
            "autoprefixer": "9.7.4",
            "babel-loader": "8.0.6",
            "babel-plugin-import": "1.13.0",
            "clean-webpack-plugin": "3.0.0",
            "compression-webpack-plugin": "3.1.0",
            "copy-webpack-plugin": "5.1.1",
            "css-loader": "3.4.2",
            "cssnano": "4.1.10",
            "file-loader": "5.1.0",
            "happypack": "5.0.1",
            "html-webpack-plugin": "3.2.0",
            "mini-css-extract-plugin": "0.9.0",
            "optimize-css-assets-webpack-plugin": "5.0.3",
            "postcss-loader": "3.0.0",
            "react-hot-loader": "4.12.19",
            "react-test-renderer": "16.13.0",
            "style-loader": "1.1.3",
            "terser-webpack-plugin": "2.3.5",
            "url-loader": "3.0.0",
            "webpack": "4.41.5",
            "webpack-bundle-analyzer": "3.6.0",
            "webpack-cli": "3.3.10",
            "webpack-dev-server": "3.10.3",
            "webpack-manifest-plugin": "2.2.0",
            "webpack-merge": "4.2.2",
            "workbox-webpack-plugin": "5.0.0",
        }
        this.scripts = {
            "build": "mj-script build",
            "dev": "mj-script dev",
            "build:pre": "mj-script build:pre",
            "analyz": "mj-script analyz",
            "add": "mj-script add",
            "deploy": "mj-script deploy",
            "build:lib": "mj-script build:lib",
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
            const script = packageJson.scripts;
            Object.keys(this.packageVersion).map(name => {
                dev[name] = this.packageVersion[name];
            })
            Object.keys(this.scripts).forEach(name => {
                script[name] = this.scripts[name];
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