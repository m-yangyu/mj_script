const path = require('path');
const { readFileSync } = require('../tools/utils');
const { getInquirerResult } = require('../tools/inquirerFunc');
const { downLoad } = require('../tools/downLoad');

const reactInit = async function(){
    const argv = this.argvs.keyMap;

    const renameParam = argv['-r'] || argv['--rename'] || '';
    const options = await getInquirerResult();
    downLoad(options, renameParam);
}

module.exports = reactInit;