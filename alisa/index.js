const { sourceDIR, DIR } = require('../static');

module.exports = {
    '@': sourceDIR,
    '~': `${DIR}/utils`
};