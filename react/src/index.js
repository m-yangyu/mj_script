import { render } from 'react-dom';
import React from 'react';
import App from './app';

const rootEl = document.getElementById('root');
render(React.createElement(App, null), rootEl);
