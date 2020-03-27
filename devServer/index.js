const fs = require('fs');
const execSync = require('child_process').execSync;
const { DIR } = require('../config/static')
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const configFactory = require('../config/webpack.config');
const devConfig = require('../config/webpack.dev.conf');
const merge = require('webpack-merge');

// 获取当前使用的端口是否被占用
function getProcessIdOnPort(port) {
    try{
        const execOptions = {
            encoding: 'utf8',
            stdio: [
                'pipe',
                'pipe',
                'ignore',
            ],
        };
        return execSync('lsof -i:' + port + ' -P -t -sTCP:LISTEN', execOptions)
          .split('\n')[0]
          .trim();
    } catch (e) {
        return null;
    }
}

const devServer = async function(port){
    
    let config = merge(configFactory('development'), devConfig);
    
    if (fs.existsSync(`${DIR}/config/devConfig.js`)) {
        config = merge(config, require(`${DIR}/config/devConfig.js`));
    }

    const compiler = webpack(config);
    const currentPort = port || config.devServer.port;
    if (getProcessIdOnPort(currentPort)) {
        devServer(currentPort + 1);
    } else {
        new webpackDevServer(compiler, {})
        .listen(
            currentPort, 
            config.devServer.host || "localhost", 
            (err) => {
                if(err) console.log(err);
            }
        )
    }
}

module.exports = devServer;