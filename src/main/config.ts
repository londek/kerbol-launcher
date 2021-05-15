import * as fs from "fs";
import * as path from "path";
import { app } from "electron";
import { exit } from "process";
import { v4 as uuidv4 } from "uuid";

export let localConfig: Config;

const configPath = path.join(app.getPath("userData"), "config.json");

function saveConfig(): void {
    fs.writeFileSync(configPath, JSON.stringify(localConfig, null, 4), {
        encoding: "utf-8",
    });
    console.log(`Saving config in ${configPath}`);
}

function loadConfig(): void {
    const configContents = fs.readFileSync(configPath, { encoding: "utf-8" });
    if (configContents === "") throw "Invalid contents?";
    localConfig = JSON.parse(configContents);
}

function copyDefaults(): boolean {
    try {
        fs.copyFileSync(
            path.resolve(app.getAppPath(), "src/common/config.json"),
            configPath,
            fs.constants.COPYFILE_FICLONE
        );
        console.log("Defaults copied successfully");
        return true;
    } catch (e) {
        console.trace(`Couldnt copy defaults ${e}`);
        return false;
    }
}

function initialize(): void {
    try {
        loadConfig();
    } catch {
        console.error("Couldnt load config. Attempting to copy defaults");
        if (copyDefaults()) {
            try {
                loadConfig();
            } catch (e) {
                console.trace(`Couldn't load config after copying ${e}`);
                exit();
            }
        }
    }
}

initialize();

export function getInstances(): Readonly<KeyedGameInstances> {
    return localConfig.instances;
}

export function storeGameInstance(
    instance: StoreGameInstanceOptions
): ErrorableResponse {
    const parsedPath = path.parse(instance.buildId);
    if (
        parsedPath.name !== "buildID64" &&
        parsedPath.name !== "buildID32" &&
        parsedPath.name !== "buildID"
    ) {
        return {
            error: "buildID syntax is wrong. Open issue on Github if you think its error",
        };
    }

    // Check for duplicates
    for (const savedInstance in localConfig.instances) {
        if (localConfig.instances[savedInstance].buildId === instance.buildId) {
            return { error: "Instance with this path already exists" };
        } else if (
            localConfig.instances[savedInstance].label === instance.label
        ) {
            return { error: "Instance with this label already exists" };
        }
    }

    // Check if directory is accessible, if node can read from it, if node can write to it and if node can execute it
    try {
        fs.accessSync(
            parsedPath.dir,
            fs.constants.R_OK | fs.constants.W_OK | fs.constants.X_OK
        );
    } catch (e) {
        console.log(e);
        return { error: "Cannot access this path" };
    }

    // Check if executable lives in directory and if launcher can execute it
    try {
        fs.accessSync(
            path.join(parsedPath.dir, "KSP_x64.exe"),
            fs.constants.X_OK
        );
    } catch (e) {
        console.log(e);
        return { error: "Cannot execute KSP in this path" };
    }

    const instanceId = uuidv4();
    localConfig.instances[instanceId] = { ...instance, root: parsedPath.dir };
    localConfig.defaultInstance = instanceId;

    try {
        saveConfig();
        return { error: null };
    } catch {
        return { error: "Failed to save config" };
    }
}

export function deleteGameInstance(id: string): ErrorableResponse {
    if (!id || !localConfig.instances[id])
        return { error: "Could not find instance with this ID" };

    delete localConfig.instances[id];

    // Check if id is default instnace
    if (id === localConfig.defaultInstance) {
        const ids = Object.keys(localConfig.instances);
        localConfig.defaultInstance = ids.length > 0 ? ids[0] : "";
    }

    try {
        saveConfig();
        return { error: null };
    } catch {
        return { error: "Failed to save config" };
    }
}

export function getDefaultInstance(): string {
    return localConfig.defaultInstance;
}

export function setDefaultInstance(
    newDefaultInstance: string
): ErrorableResponse {
    // Check for match
    for (const savedInstance in localConfig.instances) {
        if (savedInstance === newDefaultInstance) {
            localConfig.defaultInstance = newDefaultInstance;
            try {
                saveConfig();
                return { error: null };
            } catch {
                return { error: "Failed to save config" };
            }
        }
    }

    return { error: "ID is invalid" };
}
