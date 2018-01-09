export interface IWallet {
    getPrivateKey();
    getPublicKey();
    getAddress();
    getAddressString();
    getChecksumAddressString();
    getV3Filename(timestamp?: number);
    toV3(password: string, options?: any);
}
