const { exec } = require('child_process');
const { cliPath } = require('../../config/static');

const myExec = (command) => {
    exec(command, {
        cwd: cliPath
    }, (err, stdout, stdrr) => {
        if (err) throw err;
        console.log(stdout);
    })
}

const servicesStop = () => {
    myExec('npm run services-stop');
}

const servicesReStart = () => {
    myExec('npm run services-restart');
}

const servicesStart = () => {
    myExec('npm run services');
}

const servicesList = () => {
    myExec('npm run services-list');
}

const servicersDelete = () => {
    myExec('npm run services-del');
}

const services = function() {
    const keyMap = this.argvs.keyMap;
    const isStop = 'stop' in keyMap;
    const isReStart = 'restart' in keyMap;
    const isList = 'list' in keyMap;
    const isDelete = 'delete' in keyMap;
    if (isStop) {
        servicesStop();
        return ;
    }
    if (isReStart) {
        servicesReStart();
        return ;
    }
    if (isList) {
        servicesList();
        return ;
    }
    if (isDelete) {
        servicersDelete();
        return ;
    }
    servicesStart();
}

module.exports = services;