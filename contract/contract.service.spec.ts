import { TestBed, inject } from '@angular/core/testing';

import { ContractService } from './contract.service';
import { Web3Service } from '../web3/web3.service';

describe('ContractService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractService, Web3Service]
    });
  });

  it('should be created', inject([ContractService], (service: ContractService) => {
    expect(service).toBeTruthy();
  }));

  it('should be possible to create a new contract instance based upon a abi', inject([ContractService], (service: ContractService) => {
    const abi = [];
    const instance = service.getContractInstanceOf(abi);
    expect(instance).toBeDefined();
  }));

  it('should be possible to get a contract instance based upon abi and address', inject([ContractService], (service: ContractService) => {
    const abi = [];
    const address = '0x5f0c8c75ada58ebbd8ce65d5c2a0e0e5599286e2';
    const instance = service.getContractInstanceOf(abi, address);
    expect(instance.options.address.toLowerCase()).toBe(address.toLowerCase());
  }));
});
