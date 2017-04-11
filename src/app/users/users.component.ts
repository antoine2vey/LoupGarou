import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';




@Component({
  selector: 'admin',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  //providers: [ LoginService ]

})

export class UsersComponent implements OnInit {
  private isMaster: boolean = false;

  constructor(private loginService: LoginService) {}

startGame(){
  
}
  ngOnInit() {
    try {
      this.isMaster = JSON.parse(localStorage.getItem("user")).isMaster;
    } catch (e) { }
    }
}
