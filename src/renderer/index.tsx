import App from './App';
import React from 'react';
import { render } from 'react-dom';

import { FileFilter, OpenDialogReturnValue } from 'electron';

declare global {
    interface IkerbolAPI {
        configManager: {
            fetchGameInstances(): Promise<{[key: string]: GameInstance}>
            storeGameInstance(instance: StoreGameInstance): Promise<ErrorableResponse>
            fetchDefaultInstance(): Promise<string>
            updateDefaultInstance(id: string): Promise<ErrorableResponse>
        };
        fileManager: {
            openFileDialog(filters?: FileFilter[], properties?: unknown): Promise<OpenDialogReturnValue>
        };
    }
    const kerbolAPI: IkerbolAPI;
}

render(<App />, document.getElementById('app'));
