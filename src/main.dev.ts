import 'core-js/stable';
import 'regenerator-runtime/runtime';

import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

import { app, BrowserWindow } from 'electron';
import path from 'path';

import './kerbolAPI/main/configManager';
import * as fileManager from './kerbolAPI/main/fileManager';

const development = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

let mainWindow: BrowserWindow | null = null;

if (!development) {
    require('source-map-support').install();
}

const createWindow = async () => {
    console.log(`Running as ${app.getName()}`);
    console.log(`User data: ${app.getPath('userData')}`);
    console.log(`Development? ${development}`);

    mainWindow = new BrowserWindow({
        title: 'Kerbol Launcher loading...',
        width: development ? 1512 : 1024, // Add space for devtools when in development
        height: development ? 824 : 576, // Add space for devtools when in development,
        minWidth: 1024,
        minHeight: 576,
        center: true,
        show: false,
        useContentSize: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: development ? path.join(__dirname, '../dist/preload.dev.js') : path.join(__dirname, 'preload.prod.js')
        }
    });

    fileManager.setMainWindow(mainWindow);

    // Install react developer tools when in development
    if(development) {
        // Workaround till issue is not solved
        // https://github.com/MarshallOfSound/electron-devtools-installer/issues/182
        installExtension(REACT_DEVELOPER_TOOLS, { loadExtensionOptions: { allowFileAccess: true }, forceDownload: false })
            .then(name => console.log(`Added Extension:  ${name}`))
            .catch(err => console.log('An error occurred: ', err));

        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.removeMenu();
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

    // Open clicked links in default browser
    // TODO Update 'on' function
    mainWindow.webContents.on('new-window', (e, url) => {
        e.preventDefault();
        require('electron').shell.openExternal(url);
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
