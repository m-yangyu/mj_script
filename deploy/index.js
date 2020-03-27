const http = require('http');
const fs = require('fs');
const { DIR } = require('../config/static');
const ora = require('ora');
const chalk = require('chalk');

module.exports = function deploy() {

    if (!fs.existsSync(`${DIR}/config/deploy.js`)) {
        console.error('不存在配置文件，无法解析对应的构建服务器');
        return ;
    }
    const {
        host,
        port,
        url
    } = require(`${DIR}/config/deploy.js`);
    const spinner = ora('开始部署').start();
    const req = http.request(
        {
            host,
            port,
            path: url
        },
        res => {
            let content='';
            res.on('data', (chunk) => {
                content += chunk;
            });
            res.on('end', () => {
                const json = JSON.parse(content);
                if (!json.success) {
                    spinner.fail(chalk.red(json.message));
                } else {
                    spinner.succeed(chalk.green('部署完成'));
                }
            });
            res.on('error', (err, data) => {
                throw err;
            })
        }
    )
    req.end();
}