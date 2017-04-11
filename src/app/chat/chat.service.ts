import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  private url: string = 'http://localhost:3005';
  private socket: any = io(this.url);

  sendMessage(message) {
    if (message !== '') {
      this.socket.emit('messageSent', {
        name: JSON.parse(localStorage.getItem("user")).username,
        message
      })
    }
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
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
