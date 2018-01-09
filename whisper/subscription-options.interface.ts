export interface ISubscriptionOptions {
    symKeyID?: string;
    privateKeyID?: string;
    sig?: string;
    topics?: string[];
    minPow?: number;
    allowP2P: boolean;
}
