import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';

import { WhisperService } from './whisper.service';
import { Web3Service } from '../web3/web3.service';
import { IPostOptions } from './post-options.interface';
import { ISubscriptionOptions } from './subscription-options.interface';
import { IMessage } from './message.interface';

describe('WhisperService', () => {

  let service: WhisperService;

  beforeEach(() => {
    service = new WhisperService(new Web3Service('ws://localhost:8546'));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be possible to create new sym keys', async (done) => {
    const symKeyId = await service.newSymKey();
    service.getSymKeyIDs().forEach((ele) => {
      if (ele === symKeyId) {
        expect(ele).toBe(symKeyId);
        done();
      }
    });
  });

  it('should be possible to create new asym keys', async (done) => {
    const asymKeyId = await service.newAsymKeyPair();
    service.getAsymKeyIds().forEach((ele) => {
      if (ele === asymKeyId) {
        expect(ele).toBe(asymKeyId);
        done();
      }
    });
  });

  it('should be possible to send and receive whisper messages with symmetric encryption', async (done) => {
    const symKeyId = await service.newSymKey();
    const topic = '0xffaadd11';
    const payload = '0xabcd';
    const subscriptionOptions: ISubscriptionOptions = {
      allowP2P: true,
      symKeyID: symKeyId,
      topics: [topic]
    };
    const subscription = service.subscribe(subscriptionOptions);
    subscription.on('data', (message: IMessage) => {
      expect(message.payload).toBe(payload);
      done();
    });

    const postOptions: IPostOptions = {
      symKeyID: symKeyId,
      ttl: 10,
      payload: payload,
      topic: topic,
      powTime: 3,
      powTarget: 0.5
    };
    service.post(postOptions);
  });

  it('should be possible to send and receive whisper messages with asymetric encryption', async (done) => {
    const asymKeyId = await service.newAsymKeyPair();
    const publicKey = await service.getPublicKey(asymKeyId);
    const privateKey = await service.getPrivateKey(asymKeyId);
    const payload = '0xabcd';
    const subscribeOptions: ISubscriptionOptions = {
      allowP2P: true,
      privateKeyID: asymKeyId
    };
    service.subscribe(subscribeOptions).on('data', (message: IMessage) => {
      expect(message.payload).toBe(payload);
      done();
    });

    const postOptions: IPostOptions = {
      pubKey: publicKey,
      ttl: 10,
      payload: payload,
      powTime: 3,
      powTarget: 0.5
    };
    service.post(postOptions);
  });

  it('should be possible to set a Filter and retrieve Messages from a connected node', async (done) => {
    const asymKeyId = await service.newAsymKeyPair();
    const publicKey = await service.getPublicKey(asymKeyId);
    const privateKey = await service.getPrivateKey(asymKeyId);
    const payload = '0xabcd';
    const filterOptions: ISubscriptionOptions = {
      allowP2P: true,
      privateKeyID: asymKeyId
    };

    const filterId = await service.newMessageFilter(filterOptions);

    const postOptions: IPostOptions = {
      pubKey: publicKey,
      ttl: 10,
      payload: payload,
      powTime: 3,
      powTarget: 0.5
    };
    await service.post(postOptions);
    await service.post(postOptions);
    await service.post(postOptions);
    service.getFilterMessages(filterId).then((result) => {
      expect(result.length).toBeGreaterThan(1);
      done();
    });
  });

  it('should be possible to delete created message filters on the node', async (done) => {
    const asymKeyId = await service.newAsymKeyPair();
    const publicKey = await service.getPublicKey(asymKeyId);
    const privateKey = await service.getPrivateKey(asymKeyId);
    const payload = '0xabcd';
    const filterOptions: ISubscriptionOptions = {
      allowP2P: true,
      privateKeyID: asymKeyId
    };
    const filterId = await service.newMessageFilter(filterOptions);
    await service.deleteMessageFilter(filterId);
    service.getFilterMessages(filterId).catch((error) => {
      expect(error).toBeDefined();
      done();
    });
  });
});
