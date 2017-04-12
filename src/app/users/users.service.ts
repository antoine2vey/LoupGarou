import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { ProxyService } from '../proxy.service'

@Injectable()
export class UsersService {
  constructor(private proxyService: ProxyService) {}
  
  private socket:any = io(this.proxyService.socketUrl());

  startGame(){
    this.socket.emit('startGame');
  }
}
