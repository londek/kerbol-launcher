import { contextBridge } from 'electron';

import isDev from './isDev';

import * as configManager from './hooks/renderer/configManager';
import * as fileManager from './hooks/renderer/fileManager';
import * as utilitiesManager from './hooks/renderer/utilitiesManager';

declare global {
    interface IkerbolAPI {
        configManager: typeof configManager;
        fileManager: typeof fileManager;
        utilitiesManager: typeof utilitiesManager;
        isDev: () => boolean;
    }
}

const kerbolAPI: IkerbolAPI = {
    configManager,
    fileManager,
    utilitiesManager,
    isDev
};

contextBridge.exposeInMainWorld('kerbolAPI', kerbolAPI);
