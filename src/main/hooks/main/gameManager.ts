import { ipcMain } from "electron";
import { getInstances } from "../../config";

import * as childProcess from "child_process";
import path from "path";

import IPCActions from "../actions";

const { GAME_MANAGER_RUN_INSTANCE } = IPCActions;

ipcMain.handle(
    GAME_MANAGER_RUN_INSTANCE,
    async (_, id: string): Promise<ErrorableResponse> => {
        console.log(`Received ${GAME_MANAGER_RUN_INSTANCE}`);

        const instance = getInstances()[id];

        if (!instance) return { error: "Could not find instance with this ID" };

        childProcess.execFile(
            path.join(instance.root, "KSP_x64.exe"),
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
            }
        );

        return { error: null };
    }
);
