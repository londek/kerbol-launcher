import App from './App';
import React from 'react';
import { render } from 'react-dom';

import { FileFilter, OpenDialogReturnValue } from 'electron';

declare global {
    interface IkerbolAPI {
        configManager: {
            fetchGameInstances(): Promise<{[key: string]: GameInstance}>;
            storeGameInstance(instance: StoreGameInstance): Promise<ErrorableResponse>;
            deleteGameInstance(id: string): Promise<ErrorableResponse>;
            fetchDefaultInstance(): Promise<string>;
            updateDefaultInstance(id: string): Promise<void>;

            fetchGameInstancesSync(): {[key: string]: GameInstance};
            storeGameInstanceSync(instance: StoreGameInstance): ErrorableResponse;
            deleteGameInstanceSync(id: string): ErrorableResponse;
            fetchDefaultInstanceSync(): string;
            updateDefaultInstanceSync(id: string): void;
        };
        fileManager: {
            openFileDialog(filters?: FileFilter[], properties?: unknown): Promise<OpenDialogReturnValue>;

            openFileDialogSync(filters?: FileFilter[], properties?: unknown): OpenDialogReturnValue;
        };
    }
    const kerbolAPI: IkerbolAPI;
}

render(<App />, document.getElementById('app'));
