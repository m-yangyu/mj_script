const path = require('path');
const fs = require('fs');
const { viewDIR, DIR } = require('../static');
const htmlWebpackPlugin = require('html-webpack-plugin');

const entryObj = {};
const htmlPlugin = [];
const getDir = async function(viewPath) {
    const signalPath = path.resolve(viewPath, '../index.js');
    // 在src的目录下存在index.js则用单页，不存在则是多页的形式
    if (fs.existsSync(signalPath)) {
        entryObj.index = signalPath;
    } else {
        if (fs.existsSync(viewPath)) {
            const data = fs.readdirSync(viewPath);
            data.map(name => {
                const dirPath = `${viewPath}/${name}`;
                const stats = fs.statSync(dirPath);
                if (stats.isDirectory() && fs.existsSync(`${dirPath}/index.jsx`)) {
                    entryObj[name] = `${dirPath}/index.jsx`;
                }
            })
        }
    }
    Object.keys(entryObj).map(key => htmlPlugin.push(new htmlWebpackPlugin({
        template: `${DIR}/template/index.tpl.ejs`,
        filename: `${key}.html`,
        minify: true,
        inject: true,
        collapseWhitespace: true
    })));
};

getDir(viewDIR);

module.exports = {
    entryObj,
    htmlPlugin
}