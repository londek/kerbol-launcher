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
        distro: string | null;
    }

    interface StoreGameInstance {
        buildId: string;
        label: string;
        distro: string | null;
    }

    interface ErrorableResponse {
        error: string | null;
    }
}
