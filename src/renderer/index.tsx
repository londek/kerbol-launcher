import App from './App'
import React from 'react'
import { render } from 'react-dom'

declare global {
    const kerbolAPI: IkerbolAPI
}

render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('app')
)
