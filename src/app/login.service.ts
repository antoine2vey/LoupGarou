import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ProxyService } from './proxy.service';
import * as io from 'socket.io-client';

@Injectable()
export class LoginService {
  constructor(private proxyService: ProxyService) {}
    
  private socket:any = io(this.proxyService.socketUrl());

  login(username) {
    this.socket.emit('login', { username });
  }

  getError() {
    let observable = new Observable(observer => {
      this.socket.on('usernameTaken', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getUser() {
    let observable = new Observable(observer => {
      this.socket.on('infos', (data) => {        
        observer.next(data.user);
      });
    })
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('infos', (data) => {                
        observer.next(data.users);
      });
    })
    return observable;
  }

  newUser() {
    let observable = new Observable(observer => {
      this.socket.on('newPlayer', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
}
