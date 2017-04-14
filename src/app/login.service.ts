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
      this.socket.on('user', (data) => {        
        observer.next(data);
      });
    })
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users', (data) => {            
        if (data.updateLocalStorage) {
          const name = JSON.parse(localStorage.getItem('user')).username;
          const user = data.users.filter(user => user.username == name);          
          localStorage.setItem('user', JSON.stringify(user[0]));
          observer.next(data.users); 
        } else {
          observer.next(data);
        }
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
