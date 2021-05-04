export {};

declare global {
    type KeyedGameInstances = { [key: string]: GameInstance };

    interface Config {
        instances:       KeyedGameInstances;
        defaultInstance: string;
    }

    interface GameInstance {
        buildId: string;
        root: string;
        label: string;
        launchOptions: string[];
    }

    interface StoreGameInstanceOptions {
        buildId: string;
        label: string;
        launchOptions: string[];
    }

    interface ErrorableResponse {
        error: string | null;
    }
}
