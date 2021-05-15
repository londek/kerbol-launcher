import { ipcMain } from "electron";
import {
    deleteGameInstance,
    getDefaultInstance,
    getInstances,
    setDefaultInstance,
    storeGameInstance,
} from "../../config";

import isDev from "../../isDev";

import IPCActions from "../actions";

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

ipcMain.handle(
    CONFIG_MANAGER_STORE_GAME_INSTANCE,
    async (
        _,
        instance: StoreGameInstanceOptions
    ): Promise<ErrorableResponse> => {
        console.log(`Received ${CONFIG_MANAGER_STORE_GAME_INSTANCE}`);
        return storeGameInstance(instance);
    }
);

ipcMain.handle(
    CONFIG_MANAGER_DELETE_GAME_INSTANCE,
    async (_, id: string): Promise<ErrorableResponse> => {
        console.log(`Received ${CONFIG_MANAGER_DELETE_GAME_INSTANCE}`);
        return deleteGameInstance(id);
    }
);

ipcMain.handle(CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE, async () => {
    console.log(`Received ${CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE}`);
    return getDefaultInstance();
});

ipcMain.handle(
    CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE,
    async (_, newDefaultInstance: string): Promise<ErrorableResponse> => {
        console.log(`Received ${CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE}`);
        return setDefaultInstance(newDefaultInstance);
    }
);

if (isDev()) {
    ipcMain.on(CONFIG_MANAGER_INITIAL_FETCH_GAME_INSTANCES, (e) => {
        console.log(`Received ${CONFIG_MANAGER_INITIAL_FETCH_GAME_INSTANCES}`);
        e.returnValue = getInstances();
    });

    ipcMain.on(CONFIG_MANAGER_INITIAL_FETCH_DEFAULT_INSTANCE, (e) => {
        console.log(
            `Received ${CONFIG_MANAGER_INITIAL_FETCH_DEFAULT_INSTANCE}`
        );
        e.returnValue = getDefaultInstance();
    });
} else {
    ipcMain.once(CONFIG_MANAGER_INITIAL_FETCH_GAME_INSTANCES, (e) => {
        console.log(`Received ${CONFIG_MANAGER_INITIAL_FETCH_GAME_INSTANCES}`);
        e.returnValue = getInstances();
    });

    ipcMain.once(CONFIG_MANAGER_INITIAL_FETCH_DEFAULT_INSTANCE, (e) => {
        console.log(
            `Received ${CONFIG_MANAGER_INITIAL_FETCH_DEFAULT_INSTANCE}`
        );
        e.returnValue = getDefaultInstance();
    });
}
