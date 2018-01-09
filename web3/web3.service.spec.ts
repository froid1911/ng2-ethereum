import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { Web3Service } from './web3.service';

const Web3 = require('web3');

describe('Web3Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Web3Service]
    });
  });

  it('should be created', inject([Web3Service], (service: Web3Service) => {
    expect(service).toBeTruthy();
  }));

  it('should be possible to publish and subscribe web3 instances', fakeAsync(inject([Web3Service], (service: Web3Service) => {
    const expectedWeb3 = new Web3();
    service.eventEmitter.subscribe((web3) => {
      expect(expectedWeb3).toBe(web3);
    });
    service.eventEmitter.emit(expectedWeb3);
    tick();
  })));

  it('should be possible to get current web3 instance', inject([Web3Service], (service: Web3Service) => {
    const expectedWeb3 = new Web3();
    service.setWeb3(expectedWeb3);
    const actualWeb3 = service.getWeb3();

    expect(expectedWeb3).toBe(actualWeb3);
  }));
});
