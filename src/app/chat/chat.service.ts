import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  private url: string = 'http://localhost:3005';
  private socket: any = io(this.url);

  sendMessage(message) {
    this.socket.emit('messageSent', {
      name: localStorage.loginService,
      message
    })
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
}
