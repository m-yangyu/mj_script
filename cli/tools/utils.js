const fs = require('fs');
const path = require('path');

const readFileSync = (url) => {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, url)).toString());
}

const getPromiseFunc = func => (...res) => new Promise((resolve, reject) => {
    try {
        func.apply(null, [resolve, reject, ...res])
    } catch(e) {
        reject(e);
    }
});

module.exports = {
    readFileSync,
    getPromiseFunc
}