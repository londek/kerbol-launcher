import { ipcMain, shell } from "electron";

import IPCActions from "../actions";

const { UTILITY_OPEN_URL } = IPCActions;

ipcMain.on(UTILITY_OPEN_URL, async (_, url) => {
    console.log(`Received ${UTILITY_OPEN_URL}`);
    shell.openExternal(url);
});
