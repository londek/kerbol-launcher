import 'core-js/stable';
import 'regenerator-runtime/runtime';

import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

import { app, BrowserWindow } from 'electron';
import path from 'path';

import './kerbolAPI/main/configManager';
import * as fileManager from './kerbolAPI/main/fileManager';

const development = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

let mainWindow: BrowserWindow | null = null;

console.log(development ? 'Welcome from development' : 'Welcome from production');

if (!development) {
    require('source-map-support').install();
}

const createWindow = async () => {
    mainWindow = new BrowserWindow({
        title: 'Kerbol Launcher loading...',
        width: 1024,
        height: 576,
        minWidth: 1024,
        minHeight: 576,
        center: true,
        show: false,
        useContentSize: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: development ? path.join(__dirname, 'preload.dev.js') : path.join(__dirname, 'preload.prod.js')
        }
    });

    fileManager.setMainWindow(mainWindow);

    // Install react developer tools when in development
    if(development) {
        installExtension(REACT_DEVELOPER_TOOLS, { loadExtensionOptions: { allowFileAccess: true }, forceDownload: false })
            .then(name => console.log(`Added Extension:  ${name}`))
            .catch(err => console.log('An error occurred: ', err));

        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadURL(`file://${development ? path.join(__dirname, 'renderer/index.html') : path.join(__dirname, 'index.html')}`);

    mainWindow.once('ready-to-show', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    });
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.once('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
    if (mainWindow === null) createWindow();
});
