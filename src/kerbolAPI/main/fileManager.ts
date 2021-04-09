import { BrowserWindow, ipcMain, dialog } from 'electron';
import IPCActions from '@apiActions';

const {
    FILE_MANAGER_OPEN_FILE_DIALOG
} = IPCActions;

let mainWindow: BrowserWindow;

export function setMainWindow(mainwindow: BrowserWindow): void {
    mainWindow = mainwindow;
}

ipcMain.handle(FILE_MANAGER_OPEN_FILE_DIALOG, async (event, params) => {
    if(mainWindow === undefined || null) return console.log('Did not open file dialog, because main window is not initialized');
    
    console.log(`Received ${FILE_MANAGER_OPEN_FILE_DIALOG}`);
    return await dialog.showOpenDialog(mainWindow, { ...params });
});