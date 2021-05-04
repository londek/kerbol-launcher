import * as ipcRenderer from './ipcProxy';

import IPCActions from '../actions';

const {
    CONFIG_MANAGER_FETCH_GAME_INSTANCES,
    CONFIG_MANAGER_STORE_GAME_INSTANCE,
    CONFIG_MANAGER_DELETE_GAME_INSTANCE,
    CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE,
    CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE,
} = IPCActions;

/*
// Sync

export function fetchGameInstancesSync(): {[key: string]: GameInstance} {
    return ipcRenderer.invokeSync(CONFIG_MANAGER_FETCH_GAME_INSTANCES) as {[key: string]: GameInstance};
}

export function storeGameInstanceSync(instance: StoreGameInstance): ErrorableResponse {
    return ipcRenderer.invokeSync(CONFIG_MANAGER_STORE_GAME_INSTANCE, instance) as ErrorableResponse;
}

export function deleteGameInstanceSync(id: string): ErrorableResponse {
    return ipcRenderer.invokeSync(CONFIG_MANAGER_DELETE_GAME_INSTANCE, id) as ErrorableResponse;
}

export function fetchDefaultInstanceSync(): string {
    return ipcRenderer.invokeSync(CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE) as string;
}

export function updateDefaultInstanceSync(id: string): void {
    ipcRenderer.invokeSync(CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE, id) as ErrorableResponse;
}*/

// Async

export async function fetchGameInstances(): Promise<{[key: string]: GameInstance}> {
    return ipcRenderer.invoke(CONFIG_MANAGER_FETCH_GAME_INSTANCES) as Promise<{[key: string]: GameInstance}>;
}

export async function storeGameInstance(instance: StoreGameInstance): Promise<ErrorableResponse> {
    return ipcRenderer.invoke(CONFIG_MANAGER_STORE_GAME_INSTANCE, instance) as Promise<ErrorableResponse>;
}

export async function deleteGameInstance(id: string): Promise<ErrorableResponse> {
    return ipcRenderer.invoke(CONFIG_MANAGER_DELETE_GAME_INSTANCE, id) as Promise<ErrorableResponse>;
}

export async function fetchDefaultInstance(): Promise<string> {
    return ipcRenderer.invoke(CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE) as Promise<string>;
}

export async function updateDefaultInstance(id: string): Promise<void> {
    ipcRenderer.invoke(CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE, id) as Promise<ErrorableResponse>;
}
