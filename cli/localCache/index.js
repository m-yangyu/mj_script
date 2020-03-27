const fs = require('fs');
const path =require('path');
const chalk = require('chalk');

const cacheFileName = path.resolve(__dirname, './cache.json');

const readCacheOptions = () => {
    try {
        const data = fs.readFileSync(cacheFileName, {encoding: 'utf-8'});
        const json = JSON.parse(data);
        return json;
    } catch(e) {
        return null;
    }
}

const setCacheOptions = (obj) => {
    const {name, css, module, react} = obj;
    if (!fs.existsSync(cacheFileName)) {
        fs.writeFile(cacheFileName, JSON.stringify({
            [name]: {
                css,
                module,
                react
            }
        }, null, 4), (err,data) => {
            if (err) {
                console.log(chalk.red(err));
                return ;
            }
            console.log('successful');
        });
    } else {
        fs.readFile(cacheFileName, {encoding: 'utf-8'} ,(err, data) => {
            if (err) {
                console.log(chalk.red(err));
                return ;
            }
            const json = JSON.parse(data);
            const keys = Object.keys(json);
            
            // 最多只能存放5个缓存内容
            if (keys.length === 5) {
                delete json[keys[0]];
            }
            
            json[name] = {
                css,
                module,
                react
            }
            fs.writeFile(cacheFileName, JSON.stringify(json, null, 4), (err, data) => {
                if(err) console.log(err)
            })
        })
    }
}

module.exports = {
    readCacheOptions,
    setCacheOptions
}