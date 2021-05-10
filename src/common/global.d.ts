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

    interface NewsData {
        title: string;
        tags: string[];
        date: number;
        contents: string;
        url: string;
        [key: string]: unknown;
    }
}
