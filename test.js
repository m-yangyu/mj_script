const Axios = require('axios').default;
const fs = require('fs');

Axios.get('http://localhost:1234/download?plugin_name=antd').then((res) => {
    const { data } = res;
    console.log(data);
    const stream = fs.createWriteStream(`antd.zip`);
    stream.write(data);
    // fs.writeFileSync('antd.zip', data, 'binary');
})