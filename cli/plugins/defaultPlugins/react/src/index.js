module.exports = (content) => {
    const contentInfo = '';
    return {
        addInfo: (info) => contentInfo += `${info}\n`,
        getInfo: () => `import { render } from 'react-dom';
import React from 'react';
import App from './app';

${contentInfo}

const rootEl = document.getElementById('root');
render(React.createElement(App, null), rootEl);
`
    }
}