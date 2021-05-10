import { contextBridge } from 'electron';

import isDev from './isDev';

import * as configManager from './hooks/renderer/configManager';
import * as fileManager from './hooks/renderer/fileManager';

declare global {
    interface IkerbolAPI {
        configManager: typeof configManager;
        fileManager: typeof fileManager;
        isDev: () => boolean;
    }
}

const kerbolAPI: IkerbolAPI = {
    configManager,
    fileManager,
    isDev
};

contextBridge.exposeInMainWorld('kerbolAPI', kerbolAPI);
