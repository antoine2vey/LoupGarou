import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ProxyService } from '../proxy.service';
import * as io from 'socket.io-client';

@Injectable()
export class GameService {
  constructor(private proxyService: ProxyService) {}
    
  private socket:any = io(this.proxyService.socketUrl());

  wolvesWon() {
    let observable = new Observable(observer => {
      this.socket.on('wolvesWon', (data) => {
        console.log('loups', data);
        observer.next(data);
      });
    })
    return observable;
  }

  villagersWon() {
    let observable = new Observable(observer => {
      this.socket.on('villagersWon', (data) => {
        console.log('villageois', data);
        observer.next(data);
      });
    })
    return observable;
  }
}