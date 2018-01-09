import { IWallet } from './wallet.interface';

export interface IHDWallet {
    privateExtendedKey();
    publicExtendedKey();
    derivePath(path: string);
    deriveChild(index: number);
    getWallet(): IWallet;
}
