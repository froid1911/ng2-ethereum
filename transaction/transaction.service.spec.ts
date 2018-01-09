import { TestBed, inject } from '@angular/core/testing';

import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionService]
    });
  });

  it('should be created', inject([TransactionService], (service: TransactionService) => {
    expect(service).toBeTruthy();
  }));

  it('should be possible to create transaction from RawTx', inject([TransactionService], (service: TransactionService) => {
    const rawTx = {
      nonce: '00',
      gasPrice: '09184e72a000',
      gasLimit: '2710',
      to: '0x0000000000000000000000000000000000000000',
      value: '00',
    };

    const tx = service.create(rawTx);
    expect(tx).toBeDefined();
  }));

  it('should be possible to sign transaction with private key', inject([TransactionService], (service: TransactionService) => {
    const rawTx = {
      nonce: '00',
      gasPrice: '09184e72a000',
      gasLimit: '2710',
      to: '0x0000000000000000000000000000000000000000',
      value: '00',
    };

    const privateKey = 'e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109';

    const tx = service.create(rawTx);
    const signedTx = service.sign(tx, privateKey);

    expect(signedTx).toBeDefined();
  }));

  it('should be possible to serialize transaction', inject([TransactionService], (service: TransactionService) => {
    const rawTx = {
      nonce: '00',
      gasPrice: '09184e72a000',
      gasLimit: '2710',
      to: '0x0000000000000000000000000000000000000000',
      value: '00',
    };

    const privateKey = 'e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109';

    const tx = service.create(rawTx);
    const signedTx = service.sign(tx, privateKey);
    const serialized = service.serialize(signedTx);

    expect(serialized).toBeDefined();
  }));
});
