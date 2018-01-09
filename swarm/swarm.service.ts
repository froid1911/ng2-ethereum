import { Injectable } from '@angular/core';
import { Web3Service } from '../web3/web3.service';

@Injectable()
export class SwarmService {

  web3: any;

  constructor(private web3Service: Web3Service) {
    this.web3 = this.web3Service.getWeb3();
    this.setProvider();
    this.web3Service.eventEmitter.subscribe((web3) => {
      this.web3 = web3;
      this.setProvider();
    });
  }

  upload(data: any) {
    return this.web3.bzz.upload(data);
  }

  download(hash: string) {
    return this.web3.bzz.download(hash);
  }

  private setProvider() {
    this.web3.bzz.setProvider('http://127.0.0.1:8500');
  }

}
