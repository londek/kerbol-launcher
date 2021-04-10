import * as fs from 'fs';
import * as path from 'path';
import { app, ipcMain } from 'electron';
import { Config, StoreGameInstance } from 'common/config';
import { exit } from 'process';
import { v4 as uuidv4 } from 'uuid';

import IPCActions from '@apiActions';

const {
    CONFIG_MANAGER_FETCH_GAME_INSTANCES,
    CONFIG_MANAGER_STORE_GAME_INSTANCE,
    CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE,
    CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE,
} = IPCActions;

let localConfig: Config;

function saveConfig(): void {
    fs.writeFileSync(path.join(app.getPath('userData'), 'config.json'), JSON.stringify(localConfig), { encoding: 'utf-8' });
}

function loadConfig(): void {
    const configContents = fs.readFileSync(path.join(app.getPath('userData'), 'config.json'), { encoding: 'utf-8' });
    if(configContents === '') throw 'Invalid contents?';
    localConfig = JSON.parse(configContents);
}

function copyDefaults(): boolean {
    try {
        fs.copyFileSync(path.resolve(app.getAppPath(), 'src/common/config.json'), path.join(app.getPath('userData'), 'config.json'), fs.constants.COPYFILE_FICLONE);
        console.log('Defaults copied successfully');
        return true;
    } catch(e) {
        console.trace(`Couldnt copy defaults ${e}`);
        return false;
    }
}

// TODO Definetely to change, now its ugly
function initialize(): void {
    try {
        loadConfig();
    } catch {
        console.error('Couldnt load config. Attempting to copy defaults');
        if(copyDefaults()) {
            try {
                loadConfig();
            } catch(e) {
                console.trace(`Couldn't load config after copying ${e}`);
                exit();
            }
        }
    }
}

initialize();

ipcMain.handle(CONFIG_MANAGER_FETCH_GAME_INSTANCES, async () => {
    console.log(`Received ${CONFIG_MANAGER_FETCH_GAME_INSTANCES}`);
    return localConfig.instances;
});
  

// TODO Add sanity checks
ipcMain.handle(CONFIG_MANAGER_STORE_GAME_INSTANCE, async (_, instance: StoreGameInstance) => {
    console.log(`Received ${CONFIG_MANAGER_STORE_GAME_INSTANCE}`);

    // Sanity checks
    if(instance.label.length > 20) {
        return { error: true, reason: 'Label is too long' };
    } else if(instance.label.length < 3) {
        return { error: true, reason: 'Label is too short' };
    }

    const parsedPath = path.parse(instance.buildId); 
    if(parsedPath.name !== 'buildID64' &&
       parsedPath.name !== 'buildID32' &&
       parsedPath.name !== 'buildID') {
        return { error: true, reason: 'buildID syntax is wrong. Open issue on Github if you think its error' };
    }

    // Check for duplicates
    for(const savedInstance in localConfig.instances) {
        if (localConfig.instances[savedInstance].buildId === instance.buildId) {
            return { error: true, reason: 'Instance with this path already exists' };
        } else if(localConfig.instances[savedInstance].label === instance.label) {
            return { error: true, reason: 'Instance with this label already exists' };
        }
    }

    // Check if directory is accessible, if node can read from it, if node can write to it
    try {
        fs.accessSync(parsedPath.dir, fs.constants.R_OK | fs.constants.W_OK);
    } catch(e) {
        console.log(e);
        return { error: true, reason: 'Cannot access this path' };
    }
    
    const instanceId = uuidv4();
    localConfig.instances[instanceId] = { ...instance, root: parsedPath.dir };
    localConfig.defaultInstance = instanceId;

    try {
        saveConfig();
        return { error: false, reason: null };
    } catch {
        return { error: true, reason: 'Failed to save config' };
    }
});

ipcMain.handle(CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE, async () => {
    console.log(`Received ${CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE}`);
    return localConfig.defaultInstance;
});

ipcMain.handle(CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE, async (_, newDefaultInstance: string) => {
    console.log(`Received ${CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE}`);

    // Check for match
    for(const savedInstance in localConfig.instances) {
        if (savedInstance === newDefaultInstance) {
            localConfig.defaultInstance = newDefaultInstance;
            try {
                saveConfig();
                return { error: false, reason: null };
            } catch {
                return { error: true, reason: 'Failed to save config' };
            }
        }
    }

    return { error: true, reason: 'ID is invalid' };
});