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
  formatDate(number) {
    var sec_num: any = parseInt(number, 10);
    var hours: any = Math.floor(sec_num / 3600);
    var minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds: any = sec_num - (hours * 3600) - (minutes * 60);

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes+' : '+seconds;
  }
}
