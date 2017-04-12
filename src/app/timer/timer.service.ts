import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { ProxyService } from '../proxy.service';

@Injectable()
export class TimerService {
  constructor(private proxyService: ProxyService) {}
  
  private socket:any = io(this.proxyService.socketUrl());

  countdown(){
    let observable = new Observable(observer => {
      this.socket.on('timer', (data) => {
        observer.next(data.countdown);
      });
    })

    return observable;
  }
}
