const path = require('path');
const chalk = require('chalk');
const {
    downLoadGit,
    getProgramName
} = require('../tools/downLoad');

module.exports = function() {
    const argvs = this.argvs.keyMap;
    console.log(this.argvs);
    const methods = argvs['-m'] || argvs['--methods'];
    const url = argvs['-u'] || argvs['--url'];
    const name = argvs['-n'] || argvs['--name'];
    // const npmName = argvs['-n'] || argvs['--npm'];

    if (!url) {
        console.log(chalk.red('必须写上git地址'))
        return ;
    }
    let saveDirName = 'defaultPlugins';

    if (methods === 'framework') {
        saveDirName = 'framework';
    }
    
    if (url) {
        downLoadGit(
            url,
            name || getProgramName(url),
            path.resolve(__dirname, `../plugins/${saveDirName}`)
        );

    }

}