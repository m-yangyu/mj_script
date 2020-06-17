const path = require('path');
const fs = require('fs');
const config = require('./config');

const getConfigList = () => {
    Object.keys(config).forEach((key) => {
        console.log();
        console.log(`${key}: ${config[key]}`);
    })
}

const serverConfig = function() {
    const argv = this.argvs.keyMap;
    const isSetConfig = 'set' in argv;

    if (isSetConfig) {
        Object.keys(argv).forEach((key) => {
            if (argv[key]) {
                const k = key.replace('-', '');
                config[k] = argv[key];
            }
        })
        fs.writeFileSync(path.resolve(__dirname, './config.json'), JSON.stringify(config, null, '\t'));
        return ;
    }
    getConfigList();
    
}

module.exports = serverConfig;