import { ipcMain, app } from 'electron';
import { Config, GameInstance } from '../../common/config';
import { exit } from 'process';
import IPCActions from '../actions';
import * as path from 'path';
import * as fs from 'fs';

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
    localConfig = JSON.parse(configContents);
}

function copyDefaults(): boolean {
    try {
        fs.copyFileSync(path.resolve(app.getAppPath(), 'src/common/config.json'), path.join(app.getPath('userData'), 'config.json'), fs.constants.COPYFILE_EXCL);
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
        console.error('Couldnt load config. Attempting to copy default');
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
  
ipcMain.handle(CONFIG_MANAGER_STORE_GAME_INSTANCE, async (event, instance: GameInstance) => {
    console.log(`Received ${CONFIG_MANAGER_STORE_GAME_INSTANCE}`);

    // Check for duplicates
    for(const savedInstance of localConfig.instances) {
        if (savedInstance.path === instance.path) {
            return { error: true, reason: 'instance with this path already exists' };
        }
    }

    // Check if directory is accessible, if node can read from it, if node can write to it
    try {
        fs.accessSync(path.parse(instance.path).dir, fs.constants.R_OK | fs.constants.W_OK);
    } catch(e) {
        console.log(e);
        return { error: true, reason: 'cannot access this path' };
    }
    
    localConfig.instances.push(instance);

    try {
        saveConfig();
        return { error: false, reason: null };
    } catch {
        return { error: true, reason: 'failed to save config' };
    }
});

ipcMain.handle(CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE, async () => {
    console.log(`Received ${CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE}`);
    return localConfig.defaultInstance;
});

ipcMain.handle(CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE, async (event, newDefaultInstance: number) => {
    console.log(`Received ${CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE}`);
    localConfig.defaultInstance = newDefaultInstance;
    try {
        saveConfig();
        return { error: false, reason: null };
    } catch {
        return { error: true, reason: 'failed to save config' };
    }
});

