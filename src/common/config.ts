export interface Config {
    instances:       { [key: string]: GameInstance };
    defaultInstance: string;
}

export interface GameInstance {
    buildId: string;
    root: string;
    label: string;
    distro: string;
}

export interface StoreGameInstance {
    buildId: string;
    label: string;
    distro: string;
}