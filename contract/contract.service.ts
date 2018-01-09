import { Injectable } from '@angular/core';
import { Web3Service } from '../web3/web3.service';

@Injectable()
export class ContractService {

  private web3: any;

  constructor(private web3Service: Web3Service) {
    this.web3 = this.web3Service.getWeb3();
    this.web3Service.eventEmitter.subscribe((web3) => {
      this.web3 = web3;
    });
  }

  getContractInstanceOf(abi: any, address?: string) {
    return new this.web3.eth.Contract(abi, address);
  }

}
