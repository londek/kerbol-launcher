const IPCActions = {
    FILE_MANAGER_OPEN_FILE_DIALOG: '',
    CONFIG_MANAGER_FETCH_GAME_INSTANCES: '',
    CONFIG_MANAGER_STORE_GAME_INSTANCE: '',
    CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE: '',
    CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE: '',
};

for (const key in IPCActions) {
    // @ts-expect-error TS wrongly assumes that its any type. Could disable in tsconfig noImplicitAny but why :D
    IPCActions[key] = 'LAUNCHER_' + key;
}

export default IPCActions;