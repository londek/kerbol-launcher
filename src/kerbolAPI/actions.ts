const IPCActions = {
    FILE_MANAGER_OPEN_FILE_DIALOG: null,
    CONFIG_MANAGER_FETCH_GAME_INSTANCES: null,
    CONFIG_MANAGER_STORE_GAME_INSTANCE: null,
    CONFIG_MANAGER_FETCH_DEFAULT_INSTANCE: null,
    CONFIG_MANAGER_UPDATE_DEFAULT_INSTANCE: null,
};

for (const key in IPCActions) {
    IPCActions[key] = 'LAUNCHER_' + key;
}

export default IPCActions;