import * as path from 'path';
import { app, BrowserWindow } from 'electron';

// Initialize ipc handlers
import '@apiMain/configManager';
import { setMainWindow } from '@apiMain/fileManager';

let mainWindow: BrowserWindow;

const createWindow = (): void => {
    mainWindow = new BrowserWindow({
        title: 'Kerbol Launcher loading...',
        width: 1024,
        height: 576,
        minWidth: 1024,
        minHeight: 576,
        center: true,
        useContentSize: true,
        webPreferences: {
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    setMainWindow(mainWindow);

    mainWindow.loadFile(path.join(__dirname, 'frontend/app.html'));

    mainWindow.on('closed',() => (mainWindow.destroy()));

    if (process.env.NODE_ENV === 'production') {
        mainWindow.removeMenu();
    } else {
        mainWindow.webContents.openDevTools();
    }
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(mainWindow === null) {
        createWindow();
    }
});