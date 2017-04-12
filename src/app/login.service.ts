import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class LoginService {
  private url: string = 'http://localhost:3005';
  private socket: any = io(this.url);

  login(username) {
    this.socket.emit('login', { username })
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

  getUsersConnected() {    
    let observable = new Observable(observer => {
      this.socket.on('infos', (data) => {
        observer.next(data.usersConnected);
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
