import { contextBridge } from 'electron';

import * as fileManager from '@apiRenderer/fileManager';
import * as configManager from '@apiRenderer/configManager';

const kerbolAPI = {
    fileManager,
    configManager
};

contextBridge.exposeInMainWorld('kerbolAPI', kerbolAPI);

// Exposing sendSync is not needed, my plan is to expose high level apis
/*
contextBridge.exposeInMainWorld('kerbolApi', {
    sendSync: (channel, ...args) => {
        let validChannels = ['FetchGameInstances'];
        if (validChannels.includes(channel)) {
            console.log(`%c[sendSync]%c Sent sync %c${channel}%c with arguments %c${JSON.stringify(...args)}`, 'color:purple', '', 'color:yellow', '', 'color:yellow')
            const retVal = ipcRenderer.sendSync(channel, ...args);
            console.log(`%c[sendSync]%c Received sync %c${channel}%c with result %c${JSON.stringify(retVal)}`, 'color:purple', '', 'color:yellow', '', 'color:yellow')
            return retVal
        }
        throw `Invalid channel: ${channel}`
    }
})*/