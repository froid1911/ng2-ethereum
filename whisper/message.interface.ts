export interface IMessage {
    hash: string;
    sig: string;
    recipientPublicKey: string;
    timestamp: string;
    ttl: number;
    topic: string;
    payload: string;
    padding?: number;
    pow: number;
}
