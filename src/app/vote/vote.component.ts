import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Observable } from 'rxjs/Observable';
import { ProxyService } from '../proxy.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  constructor(private proxyService: ProxyService, private loginService: LoginService) { }

  private users: any;
  private connection: any;
  private socket:any = io(this.proxyService.socketUrl());  

  ngOnInit() {
    console.log('vote initd')    
    this.connection = this.loginService.getUsers().subscribe(users => {
      this.users = users;            
    }); 
  }
}
