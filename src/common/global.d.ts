export {};

declare global {
    interface Config {
        instances:       { [key: string]: GameInstance };
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
