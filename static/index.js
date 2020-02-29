const path = require('path');

const DIR = process.cwd();
const viewDIR = `${DIR}/src/view`
const sourceDIR = `${DIR}/src`
const outputDIR = `${DIR}/dist`

module.exports = {
    DIR,
    viewDIR,
    outputDIR,
    sourceDIR
}