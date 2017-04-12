import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { ProxyService } from './proxy.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  constructor(private loginService: LoginService,
              private proxyService: ProxyService) {}

  private users: any = [];
  private socket:any = io(this.proxyService.socketUrl());
  
  ngOnInit() {             
    this.loginService.getUsersConnected().subscribe(users => {
      console.log(users);
    })
  }
}
