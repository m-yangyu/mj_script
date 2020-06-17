const { exec } = require('child_process');
const { cliPath } = require('../../config/static');

const servicesStop = () => {
    exec('npm run services-stop', {
        cwd: cliPath
    });
}

const servicesReStart = () => {
    exec('npm run services-restart', {
        cwd: cliPath
    });
}

const servicesStart = () => {
    exec('npm run services', {
        cwd: cliPath
    });
}

const services = function() {
    const keyMap = this.argvs.keyMap;
    const isStop = 'stop' in keyMap;
    const isReStart = 'restart' in keyMap;

    if (isStop) {
        servicesStop();
        return ;
    }
    if (isReStart) {
        servicesReStart();
        return ;
    }
    servicesStart();
}

module.exports = services;