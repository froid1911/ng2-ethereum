import { Injectable, EventEmitter } from '@angular/core';
import { IHDWallet } from './hdwallet.interface';
import { IWallet } from './wallet.interface';
import { isNullOrUndefined } from 'util';
import { IWalletStorage } from './wallet-storage.interface';

const hdkey = require('ethereumjs-wallet/hdkey');
const etherWallet = require('ethereumjs-wallet');
const bip39 = require('bip39');
const CryptoJS = require('crypto-js');
const stringify = require('json-stringify-safe');

@Injectable()
export class WalletService {

  static STORAGE_PATH = 'hdWallet';

  private hdInstance: IHDWallet;
  private wallets: IWallet[] = [];
  private password: string;
  private mnemonic: string;
  activeWallet: IWallet;
  eventEmitter: EventEmitter<IWallet> = new EventEmitter<IWallet>();


  constructor() { }

  generateWallet(password: string): IWallet {
    if (!isNullOrUndefined(this.hdInstance)) {
      return null;
    }

    this.password = password;
    this.mnemonic = this.generateMnemonic();
    this.hdInstance = hdkey.fromMasterSeed(this.mnemonic);
    const wallet = this.createAccount();
    this.setWallet(wallet);
    return wallet;
  }

  createAccount(): IWallet {
    const index = this.wallets.length;
    const wallet = this.hdInstance.deriveChild(index);
    this.wallets.push(wallet.getWallet());

    return wallet.getWallet();
  }

  loadWallet(password: string): IWallet {
    const data = localStorage.getItem(WalletService.STORAGE_PATH);
    if (isNullOrUndefined(data)) {
      return null;
    }

    const dataObj: IWalletStorage = JSON.parse(data);
    this.mnemonic = CryptoJS.AES.decrypt(dataObj.encSeed, password).toString(CryptoJS.enc.Utf8);
    this.hdInstance = hdkey.fromMasterSeed(this.mnemonic);
    this.password = password;
    this.wallets = [];
    dataObj.encWallets.forEach((ele) => {
      this.wallets.push(etherWallet.fromV3(ele, password));
    });

    this.setWallet(this.wallets[0]);
    return this.wallets[0];
  }

  protected setWallet(wallet: IWallet) {
    this.activeWallet = wallet;
    this.eventEmitter.emit(wallet);
  }

  getWallet(): IWallet {
    return this.activeWallet;
  }

  persistWallet(password: string): boolean {
    const persistObj: IWalletStorage = {
      encWallets: [],
      encSeed: CryptoJS.AES.encrypt(this.mnemonic, password).toString(),
    };

    this.wallets.forEach(ele => {
      persistObj.encWallets.push(JSON.stringify(ele.toV3(password)));
    });

    localStorage.setItem(WalletService.STORAGE_PATH, JSON.stringify(persistObj));

    return true;
  }

  getWalletOf(address: string): IWallet {
    let wallet: IWallet;
    this.wallets.forEach((ele: IWallet) => {
      if (ele.getAddressString() === address) {
        wallet = ele;
        return;
      }
    });

    return wallet;
  }

  getAccounts(): string[] {
    const accounts: string[] = [];
    this.wallets.forEach((ele) => {
      accounts.push(ele.getAddressString());
    });

    return accounts;
  }

  protected generateMnemonic() {
    const mnemonic = bip39.generateMnemonic();
    return mnemonic;
  }

}
