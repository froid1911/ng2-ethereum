import { Injectable, EventEmitter } from '@angular/core';

const Web3 = require('web3');

@Injectable()
export class Web3Service {

  eventEmitter: EventEmitter<any> = new EventEmitter();
  private instance: any;

  constructor(path?: string) {
    this.setWeb3(new Web3(path));
  }

  setWeb3(web3: any) {
    this.instance = web3;
    this.eventEmitter.emit(web3);
  }

  getWeb3() {
    return this.instance;
  }


}
