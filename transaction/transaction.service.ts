import { Injectable } from '@angular/core';
const Tx = require('ethereumjs-tx');


@Injectable()
export class TransactionService {

  constructor() { }

  create(rawTx: any) {
    const tx = new Tx(rawTx);
    return tx;
  }

  sign(tx: any, privateKey: string) {
    const privateKeyBuffer = Buffer.from(privateKey, 'hex');
    tx.sign(privateKeyBuffer);
    return tx;
  }

  serialize(tx: any) {
    return tx.serialize();
  }

}
