import { Injectable } from '@angular/core';
import { ProxyService } from '../proxy.service';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class WolveChatService {
  constructor(private proxyService: ProxyService) { }
  private socket: any = io(this.proxyService.socketUrl());  

  sendMessage(message) {    
    if (message !== '') {
      this.socket.emit('messageSentToWolves', {
        name: JSON.parse(localStorage.getItem("user")).username,
        message
      })
    }
  }

  giveRole() {
    let observable = new Observable(observer => {
      this.socket.on('role', (data) => {
        console.log(data);
        const name = JSON.parse(localStorage.getItem('user')).username;
        const role = data.filter(u => u.username === name).map(x => x.role)[0];
        observer.next(role);
      });
    })
    return observable;
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('messageToWolves', (data) => {        
        const name = JSON.parse(localStorage.getItem("user")).username;
        if (data.from === name) {
          data.own = true
        }
        observer.next(data);        
      });
    })
    return observable;
  }

  login() {
    let observable = new Observable(observer => {
      this.socket.on('newPlayer', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
}