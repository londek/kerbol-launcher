import App from './App';
import React from 'react';
import { render } from 'react-dom';

import { OpenDialogReturnValue } from 'electron';

declare global {
    interface IkerbolAPI {
        configManager: {
            fetchGameInstances(): Promise<{[key: string]: GameInstance}>
            storeGameInstance(instance: StoreGameInstance): Promise<void>
            fetchDefaultInstance(): Promise<string>
            updateDefaultInstance(id: string): Promise<void>
        };
        fileManager: {
            openFileDialog(filters: string[], properties: string[]): Promise<OpenDialogReturnValue>
        };
    }
    const kerbolAPI: IkerbolAPI;
}

render(<App />, document.getElementById('app'));
