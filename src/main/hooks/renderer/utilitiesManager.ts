import * as ipcRenderer from './ipcProxy';

import IPCActions from '../actions';

const {
    UTILITY_OPEN_URL
} = IPCActions;

// Sync

export function openURLSync(url: string): void {
    ipcRenderer.sendSync(UTILITY_OPEN_URL, url);
}

// Async

export async function openURL(url: string): Promise<void> {
    ipcRenderer.send(UTILITY_OPEN_URL, url);
}
