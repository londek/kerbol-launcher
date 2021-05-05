import * as ipcRenderer from './ipcProxy';

import IPCActions from '../actions';

const {
    CONFIG_MANAGER_FETCH_GAME_INSTANCES,
    CONFIG_MANAGER_STORE_GAME_INSTANCE,
    CONFIG_MANAGER_DELETE_GAME_INSTANCE,
    CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE,
    CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE,
    CONFIG_MANAGER_INITIAL_FETCH_GAME_INSTANCES,
    CONFIG_MANAGER_INITIAL_FETCH_DEFAULT_INSTANCE
} = IPCActions;


// Sync
// Only most needed methods, its not good to go synchronous when having GUI

export function fetchInitialGameInstances(): KeyedGameInstances {
    return ipcRenderer.sendSync(CONFIG_MANAGER_INITIAL_FETCH_GAME_INSTANCES) as KeyedGameInstances;
}

export function fetchInitialDefaultInstance(): string {
    return ipcRenderer.sendSync(CONFIG_MANAGER_INITIAL_FETCH_DEFAULT_INSTANCE) as string;
}

// Async

export async function fetchGameInstances(): Promise<KeyedGameInstances> {
    return ipcRenderer.invoke(CONFIG_MANAGER_FETCH_GAME_INSTANCES) as Promise<{[key: string]: GameInstance}>;
}

export async function storeGameInstance(instance: StoreGameInstanceOptions): Promise<ErrorableResponse> {
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
