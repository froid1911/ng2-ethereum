export interface IPostOptions {
    symKeyID?: string;
    pubKey?: string;
    sig?: string;
    ttl: number;
    payload: string;
    padding?: number;
    topic?: string;
    powTime?: number;
    powTarget?: number;
    targetPeer?: number;
}
