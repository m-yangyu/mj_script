const fs = require('fs');
const path = require('path');

const readFileSync = (url) => {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, url)).toString());
}

module.exports = {
    readFileSync
}