import { TestBed, inject } from '@angular/core/testing';

import { WalletService } from './wallet.service';

describe('WalletService', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [WalletService]
    });
  });

  it('should be created', inject([WalletService], (service: WalletService) => {
    expect(service).toBeTruthy();
  }));

  it('should be possible to generate a wallet', inject([WalletService], (service: WalletService) => {
    const password = 'password';
    const wallet = service.generateWallet(password);
    expect(wallet).toBeDefined();
  }));

  it('should be possible to persist and load wallet', inject([WalletService], (service: WalletService) => {
    const pw = 'password';
    service.generateWallet(pw);
    const accounts = service.getAccounts();
    const wallet = service.getWalletOf(accounts[0]);
    service.persistWallet(pw);
    const service2 = new WalletService();
    const restoredWallet = service2.loadWallet(pw);
    expect(wallet.getAddressString()).toBe(restoredWallet.getAddressString());
  }));

  it('should be possible to publish and subscribe a wallet emitter', (done) => {
    const service = new WalletService();
    service.eventEmitter.subscribe((wallet) => {
      expect(wallet.getAddressString()).toBeDefined();
      done();
    });

    service.generateWallet('password');
  });

  it('should be possible to getAccounts', inject([WalletService], (service: WalletService) => {
    service.generateWallet('password');
    const accounts = service.getAccounts();
    expect(accounts.length).toBe(1);
  }));
});
