import { contextBridge } from 'electron';

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
    isDev: () => process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'
};

contextBridge.exposeInMainWorld('kerbolAPI', kerbolAPI);
