export interface IBootstrap {
    init(): Promise<boolean | string>;
}