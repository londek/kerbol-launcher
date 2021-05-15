import * as ipcRenderer from "./ipcProxy";

import IPCActions from "../actions";

const { GAME_MANAGER_RUN_INSTANCE } = IPCActions;

// Async

export async function runInstance(id: string): Promise<ErrorableResponse> {
    return ipcRenderer.invoke(
        GAME_MANAGER_RUN_INSTANCE,
        id
    ) as Promise<ErrorableResponse>;
}
