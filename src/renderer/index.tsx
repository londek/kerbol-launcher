import App from './App';
import React from 'react';
import { render } from 'react-dom';

declare global {
    const kerbolAPI: IkerbolAPI;
}

render(<App />, document.getElementById('app'));
