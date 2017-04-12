import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class TimerService {
  private url: string = 'http://localhost:3005';
  private socket: any = io(this.url);

  countdown(){
    let observable = new Observable(observer => {
      this.socket.on('timer', (data) => {
        observer.next(data.countdown);
      });
    })
    
    return observable;
  }
}
