import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';


@Component({
  selector: 'admin',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  //providers: [ LoginService ]


})

export class UsersComponent implements OnInit {
  private socket: any;
  private connection: any;
  private isMaster: boolean = false;



  constructor(private loginService: LoginService) {}

  login(username) {
    this.loginService.login(username);
  }

  ngOnInit() {
    this.isMaster = JSON.parse(localStorage.getItem("user"));
  }
}
