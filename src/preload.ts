import { contextBridge } from 'electron';

import * as configManager from './kerbolAPI/renderer/configManager';
import * as fileManager from './kerbolAPI/renderer/fileManager';

const kerbolAPI = {
    configManager,
    fileManager,
    isDev: () => process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'
};

contextBridge.exposeInMainWorld('kerbolAPI', kerbolAPI);
