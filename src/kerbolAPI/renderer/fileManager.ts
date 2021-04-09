import { OpenDialogReturnValue } from 'electron';
import * as ipcRenderer from './ipcProxy';

import IPCActions from '@apiActions';

const {
    FILE_MANAGER_OPEN_FILE_DIALOG
} = IPCActions;

export async function openFileDialog(filters: string[], properties: string[]): Promise<OpenDialogReturnValue> {
    return <Promise<OpenDialogReturnValue>>ipcRenderer.invoke(FILE_MANAGER_OPEN_FILE_DIALOG, { filters, properties });
}