const path = require('path');
const { readFileSync } = require('../tools/utils');
const { getInquirerResult } = require(`${path.resolve(__dirname, '../tools/inquirerFunc')}`);
const { downLoad } = require(`${path.resolve(__dirname, '../tools/downLoad')}`);

const reactInit = async function(){
    const argv = this.argvs.keyMap;

    const downLoadTypes = readFileSync(path.resolve(__dirname, './typeManifest.json'));
    const renameParam = argv['-r'] || argv['--rename'] || '';
    const options = await getInquirerResult();
    const url = downLoadTypes.react;
    downLoad(options, url, renameParam);
}

module.exports = reactInit;