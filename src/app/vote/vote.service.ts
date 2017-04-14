import { Injectable } from '@angular/core';
import { ProxyService } from '../proxy.service';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class VoteService {
  constructor(private proxyService: ProxyService) { }
  private socket: any = io(this.proxyService.socketUrl());  

  sendVote(user) {
    this.socket.emit('vote', {
      from: JSON.parse(localStorage.getItem('user')).username,
      against: user
    })
  }

  countdown(){
    let observable = new Observable(observer => {
      this.socket.on('timer', (data) => {
        observer.next(data.countdown);
      });
    })

    return observable;
  }

  displayVotes(){
    let observable = new Observable(observer => {
      this.socket.on('votes', (data) => {
        observer.next(data);
      });
    })

    return observable;
  }
}
