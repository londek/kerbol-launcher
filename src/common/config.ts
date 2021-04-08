export interface Config {
    instances:       GameInstance[];
    defaultInstance: number;
}

export interface GameInstance {
    arch: number;
    path: string;
    label: string;
    distro: string;
}