import "core-js/stable";
import "regenerator-runtime/runtime";

import installExtension, {
    REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import sourceMapSupport from "source-map-support";

import { app, BrowserWindow, globalShortcut, shell } from "electron";
import path from "path";
import isDev from "./isDev";

// Load all hooks
import "./hooks/main/configManager";
import * as fileManager from "./hooks/main/fileManager";
import "./hooks/main/gameManager";
import "./hooks/main/utilitiesManager";

const development = isDev();
let mainWindow: BrowserWindow | null = null;

const printBanner = () => {
    console.log(`Running as ${app.getName()}`);
    console.log(`User data: ${app.getPath("userData")}`);
    console.log(`Development? ${development}`);
    console.log();
};

const createWindow = async () => {
    printBanner();

    mainWindow = new BrowserWindow({
        title: "Kerbol Launcher",
        width: development ? 1512 : 1024,
        height: development ? 824 : 576,
        minWidth: development ? 1160 : 1024,
        minHeight: development ? 576 : 576,
        center: true,
        show: false,
        useContentSize: true,
        webPreferences: {
            preload: development
                ? path.join(__dirname, "../../dist/preload.dev.js")
                : path.join(__dirname, "preload.prod.js"),
        },
    });

    fileManager.setMainWindow(mainWindow);

    if (development) {
        sourceMapSupport.install();

        // HACK Till issue is not solved
        // https://github.com/MarshallOfSound/electron-devtools-installer/issues/182
        installExtension(REACT_DEVELOPER_TOOLS, {
            loadExtensionOptions: { allowFileAccess: true },
            forceDownload: false,
        })
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log("An error occurred: ", err));

        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.removeMenu();
    }

    mainWindow.loadFile(
        development
            ? path.join(__dirname, "../renderer/index.html")
            : path.join(__dirname, "index.html")
    );

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        // Anyone ever gets this, please make issue on github
        console.warn(
            `Opening new browser window for ${url}. Its bad practice, because it blocks thread`
        );
        shell.openExternal(url);
        return { action: "deny" };
    });

    mainWindow.on("ready-to-show", () => {
        if (!mainWindow) {
            throw new Error("mainWindow is not defined");
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
            return;
        }
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
};

app.on("window-all-closed", () => {
    process.platform !== "darwin" && app.quit();
});

app.whenReady().then(createWindow).catch(console.error);

app.on("will-quit", () => {
    globalShortcut.unregisterAll();
});

app.on("activate", () => {
    if (!mainWindow) createWindow();
});
