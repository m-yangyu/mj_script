const http = require('http');
const fs = require('fs');
const { DIR } = require('../static');

module.exports = function deploy() {

    if (!fs.existsSync(`${DIR}/config/deploy.js`)) {
        console.error('不存在配置文件，无法解析对应的构建服务器');
        return ;
    }

    fs.readFile(`${DIR}/config/deploy.js`, function(err, data) {
        if (err) throw err;
        console.log(data);
    });

}