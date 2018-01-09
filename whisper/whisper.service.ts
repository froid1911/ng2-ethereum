import { Injectable } from '@angular/core';
import { Web3Service } from '../web3/web3.service';
import { ISubscriptionOptions } from './subscription-options.interface';
import { IPostOptions } from './post-options.interface';
import { IMessage } from './message.interface';

@Injectable()
export class WhisperService {

  private symKeys: any[] = [];
  private asymKeys: any[] = [];

  private web3: any;

  constructor(private web3Service: Web3Service) {
    this.web3 = this.web3Service.getWeb3();
    this.web3Service.eventEmitter.subscribe((web3) => {
      this.web3 = web3;
    });
  }

  newSymKey(): Promise<string> {
    return this.web3.shh.newSymKey().then((id) => {
      this.symKeys.push(id);
      return id;
    });
  }

  addSymKey(key: string) {
    return this.web3.shh.addSymKey(key).then((id) => {
      this.symKeys.push(id);
      return id;
    });
  }

  deleteSymKey(id: string) {
    return this.web3.shh.deleteSymKey(id).then((success) => {
      this.symKeys.forEach((ele, index) => {
        if (ele === id) {
          this.symKeys.splice(index, 1);
        }
      });

      return true;
    });
  }

  getSymKeyIDs() {
    return this.symKeys;
  }

  getSymKey(id: string) {
    return this.web3.shh.getSymKey(id);
  }

  getAsymKeyIds() {
    return this.asymKeys;
  }

  newAsymKeyPair() {
    return this.web3.shh.newKeyPair()
      .then((asymKeyId) => {
        this.asymKeys.push(asymKeyId);
        return asymKeyId;
      });
  }

  getPublicKey(id: string) {
    return this.web3.shh.getPublicKey(id);
  }

  getPrivateKey(id: string) {
    return this.web3.shh.getPrivateKey(id);
  }

  post(options: IPostOptions) {
    return this.web3.shh.post(options);
  }

  subscribe(options: ISubscriptionOptions) {
    return this.web3.shh.subscribe('messages', options);
  }

  clearSubscriptions() {

  }

  newMessageFilter(options: ISubscriptionOptions) {
    return this.web3.shh.newMessageFilter(options);
  }

  deleteMessageFilter(id: string) {
    return this.web3.shh.deleteMessageFilter(id);
  }

  getFilterMessages(id: string) {
    return this.web3.shh.getFilterMessages(id);
  }



}
