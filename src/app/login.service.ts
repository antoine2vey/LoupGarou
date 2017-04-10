import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class LoginService {
  private url: string = 'http://localhost:3005';  
  private socket: any;
  
  login(username) {
    this.socket.emit('login', {username})
  }

  getError() {    
    let observable = new Observable(observer => {      
      this.socket = io(this.url);
      this.socket.on('usernameTaken', (data) => {                
        observer.next(data);    
      });
    })
    return observable;
  }  
}
