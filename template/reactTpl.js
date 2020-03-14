const getClassTemplate = (name, styles) => {

    return `import React, { Component } from 'react';
import Style from './index.module.${styles}';

class ${name} extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default ${name}
    `
}

const getHookTemplate = (name, styles) => {

    return `import React, { useState, useEffect } from 'react';
import Style from './index.module.${styles}';

const ${name} = () => {
    return (
        <div></div>
    )
}

export default ${name}
    `
}

const getTemplate = (type, name, styles) => {
    if (type === 'hook') {
        return getHookTemplate(name, styles);
    }
    return getClassTemplate(name, styles);
}

module.exports = getTemplate;