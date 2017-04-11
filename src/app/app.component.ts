import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})

export class AppComponent implements OnInit {
  private users: any = [];
  private socket:any = io('http://localhost:3005');

  constructor(private loginService: LoginService) {
    this.socket.on('infos', (users) => {        
      this.users = users;
    });    
  }
  ngOnInit() {             
      
  }
}
