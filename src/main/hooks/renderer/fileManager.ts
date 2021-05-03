import * as ipcRenderer from './ipcProxy';
import { FileFilter, OpenDialogReturnValue } from 'electron';

import IPCActions from '../actions';

const {
    FILE_MANAGER_OPEN_FILE_DIALOG
} = IPCActions;

/*
// Sync

export function openFileDialogSync(filters?: FileFilter[], properties?: string[]): OpenDialogReturnValue {
    return ipcRenderer.invokeSync(FILE_MANAGER_OPEN_FILE_DIALOG, { filters, properties }) as OpenDialogReturnValue;
}*/

// Async

export async function openFileDialog(filters?: FileFilter[], properties?: string[]): Promise<OpenDialogReturnValue> {
    return ipcRenderer.invoke(FILE_MANAGER_OPEN_FILE_DIALOG, { filters, properties }) as Promise<OpenDialogReturnValue>;
}
