import * as ipcRenderer from './ipcProxy';

import IPCActions from '../actions';

const {
    CONFIG_MANAGER_FETCH_GAME_INSTANCES,
    CONFIG_MANAGER_STORE_GAME_INSTANCE,
    CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE,
    CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE
} = IPCActions;

// Sync

export function fetchGameInstancesSync(): {[key: string]: GameInstance} {
    return ipcRenderer.invokeSync(CONFIG_MANAGER_FETCH_GAME_INSTANCES) as {[key: string]: GameInstance};
}

export function storeGameInstanceSync(instance: StoreGameInstance): void {
    ipcRenderer.invokeSync(CONFIG_MANAGER_STORE_GAME_INSTANCE, instance);
}

export function fetchDefaultInstanceSync(): string {
    return ipcRenderer.invokeSync(CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE) as string;
}

export function updateDefaultInstanceSync(id: string): void {
    ipcRenderer.invokeSync(CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE, id);
}

// Async

export async function fetchGameInstances(): Promise<{[key: string]: GameInstance}> {
    return <Promise<{[key: string]: GameInstance}>>ipcRenderer.invoke(CONFIG_MANAGER_FETCH_GAME_INSTANCES);
}

export async function storeGameInstance(instance: StoreGameInstance): Promise<void> {
    return <Promise<void>>ipcRenderer.invoke(CONFIG_MANAGER_STORE_GAME_INSTANCE, instance);
}

export async function fetchDefaultInstance(): Promise<string> {
    return <Promise<string>>ipcRenderer.invoke(CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE);
}

export async function updateDefaultInstance(id: string): Promise<void> {
    return <Promise<void>>ipcRenderer.invoke(CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE, id);
}
