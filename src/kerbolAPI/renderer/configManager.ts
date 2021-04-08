import { GameInstance } from '../../common/config';
import * as ipcRenderer from './ipcProxy';

import IPCActions from '../actions';

const {
    CONFIG_MANAGER_FETCH_GAME_INSTANCES,
    CONFIG_MANAGER_STORE_GAME_INSTANCE
} = IPCActions;

export async function fetchGameInstances(): Promise<GameInstance[]> {
    return <Promise<GameInstance[]>>ipcRenderer.invoke(CONFIG_MANAGER_FETCH_GAME_INSTANCES);
}

export async function storeGameInstance(instance: GameInstance): Promise<GameInstance> {
    return <Promise<GameInstance>>ipcRenderer.invoke(CONFIG_MANAGER_STORE_GAME_INSTANCE, instance);
}