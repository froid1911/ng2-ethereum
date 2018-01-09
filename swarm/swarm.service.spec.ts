import { TestBed, inject } from '@angular/core/testing';
import { SwarmService } from './swarm.service';
import { Web3Service } from '../web3/web3.service';

const Web3 = require('web3');
import * as Bzz from 'web3-bzz';
const swarm = require('swarm-js');

class BzzMockup {
  upload(data: string): Promise<string> {
    return new Promise((resolve) => {
      resolve('hash');
    });
  }

  download(hash: string): Promise<string> {
    return new Promise((resolve) => {
      resolve('data');
    });
  }
}

fdescribe('SwarmService', () => {

  const web3Service = new Web3Service('http://127.0.0.1:8500');
  let service: SwarmService;

  beforeEach(() => {
    service = new SwarmService(new Web3Service('ws://127.0.0.1:8546'));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /** @TODO: Tests needs to be implemented */
  it('should be possible to upload and download data from swarm', () => {

  });
});
