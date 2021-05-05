import { ipcMain } from 'electron';
import {
    deleteGameInstance,
    getDefaultInstance,
    getInstances,
    setDefaultInstance,
    storeGameInstance
} from '../../config';

import IPCActions from '../actions';

const {
    CONFIG_MANAGER_FETCH_GAME_INSTANCES,
    CONFIG_MANAGER_STORE_GAME_INSTANCE,
    CONFIG_MANAGER_DELETE_GAME_INSTANCE,
    CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE,
    CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE,
    CONFIG_MANAGER_INITIAL_FETCH_GAME_INSTANCES,
    CONFIG_MANAGER_INITIAL_FETCH_DEFAULT_INSTANCE,
} = IPCActions;

ipcMain.handle(CONFIG_MANAGER_FETCH_GAME_INSTANCES, async () => {
    console.log(`Received ${CONFIG_MANAGER_FETCH_GAME_INSTANCES}`);
    return getInstances();
});

ipcMain.handle(CONFIG_MANAGER_STORE_GAME_INSTANCE, async (_, instance: StoreGameInstanceOptions): Promise<ErrorableResponse> => {
    console.log(`Received ${CONFIG_MANAGER_STORE_GAME_INSTANCE}`);
    return storeGameInstance(instance);
});

ipcMain.handle(CONFIG_MANAGER_DELETE_GAME_INSTANCE, async (_, id: string): Promise<ErrorableResponse> => {
    console.log(`Received ${CONFIG_MANAGER_DELETE_GAME_INSTANCE}`);
    return deleteGameInstance(id);
});

ipcMain.handle(CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE, async () => {
    console.log(`Received ${CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE}`);
    return getDefaultInstance();
});

ipcMain.handle(CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE, async (_, newDefaultInstance: string): Promise<ErrorableResponse> => {
    console.log(`Received ${CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE}`);
    return setDefaultInstance(newDefaultInstance);
});

ipcMain.once(CONFIG_MANAGER_INITIAL_FETCH_GAME_INSTANCES, e => {
    console.log(`Received ${CONFIG_MANAGER_INITIAL_FETCH_GAME_INSTANCES}`);
    e.returnValue = getInstances();
});

ipcMain.once(CONFIG_MANAGER_INITIAL_FETCH_DEFAULT_INSTANCE, e => {
    console.log(`Received ${CONFIG_MANAGER_INITIAL_FETCH_DEFAULT_INSTANCE}`);
    e.returnValue = getDefaultInstance();
});

/*
ipcMain.handle(CONFIG_MANAGER_LAUNCH_INSTANCE, async (_): Promise<ErrorableResponse> => {
    console.log(`Received ${CONFIG_MANAGER_LAUNCH_INSTANCE}`);

    return { error: 'Not implemented yet' };


    if(!mainWindow) return { error: 'Main window in config manager has not been initialized' };

    if(!id || !localConfig.instances[id]) return { error: 'Could not find instance with this ID' };

    const instance: GameInstance = localConfig.instances[id];

    mainWindow.hide();

    childProcess.execFile(path.join(instance.root, 'KSP_x64.exe'), (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);

        mainWindow.show();
    });

    return { error: null };
});
*/
