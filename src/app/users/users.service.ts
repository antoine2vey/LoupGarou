import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class UsersService {
  private url: string = 'http://localhost:3005';
  private socket: any = io(this.url);
}
