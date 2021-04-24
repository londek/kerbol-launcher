import * as ipcRenderer from './ipcProxy';
import { FileFilter, OpenDialogReturnValue } from 'electron';

import IPCActions from '../actions';

const {
    FILE_MANAGER_OPEN_FILE_DIALOG
} = IPCActions;

export async function openFileDialog(filters?: FileFilter[], properties?: string[]): Promise<OpenDialogReturnValue> {
    return <Promise<OpenDialogReturnValue>>ipcRenderer.invoke(FILE_MANAGER_OPEN_FILE_DIALOG, { filters, properties });
}
