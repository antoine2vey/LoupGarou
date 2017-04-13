import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { ProxyService } from '../proxy.service'

@Injectable()
export class UsersService {
  constructor(private proxyService: ProxyService) { }

  private socket: any = io(this.proxyService.socketUrl());
  private animate = new Subject<boolean>();
  newAnimate$ = this.animate.asObservable();

  startGame(animate: boolean) {
    this.animate.next(animate);
    this.socket.emit('startGame');
  }

  getAnimate() {
    let observable = new Observable(observer => {
      observer.next(this.animate);
    })
    return observable;
  }
}
