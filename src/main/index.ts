import 'core-js/stable';
import 'regenerator-runtime/runtime';

import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import sourceMapSupport from 'source-map-support';

import { app, BrowserWindow, globalShortcut, shell } from 'electron';
import path from 'path';
import isDev from './isDev';

import './hooks/main/configManager';
import * as fileManager from './hooks/main/fileManager';

const development = isDev();
let mainWindow: BrowserWindow | null = null;

const printBanner = () => {
    console.log(`Running as ${app.getName()}`);
    console.log(`User data: ${app.getPath('userData')}`);
    console.log(`Development? ${development}`);
    console.log();
};

const createWindow = async () => {
    printBanner();

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
            preload: development ? path.join(__dirname, '../../dist/preload.dev.js') : path.join(__dirname, 'preload.prod.js')
        }
    });

    fileManager.setMainWindow(mainWindow);

    if(development) {
        sourceMapSupport.install();

        // HACK Till issue is not solved
        // https://github.com/MarshallOfSound/electron-devtools-installer/issues/182
        installExtension(REACT_DEVELOPER_TOOLS, { loadExtensionOptions: { allowFileAccess: true }, forceDownload: false })
            .then(name => console.log(`Added Extension:  ${name}`))
            .catch(err => console.log('An error occurred: ', err));

        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.removeMenu();
    }

    mainWindow.loadFile(development ? path.join(__dirname, '../renderer/index.html') : path.join(__dirname, 'index.html'));

    mainWindow.once('ready-to-show', () => {
        if (!mainWindow) {
            throw new Error('mainWindow is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
            return;
        }
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.webContents.setWindowOpenHandler(({ url }: Electron.HandlerDetails) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
};

app.once('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

app.on('activate', () => {
    if (mainWindow === null) createWindow();
});
