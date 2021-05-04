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

    interface StoreGameInstance {
        buildId: string;
        label: string;
    }

    interface ErrorableResponse {
        error: string | null;
    }
}
