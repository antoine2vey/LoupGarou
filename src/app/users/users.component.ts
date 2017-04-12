import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'admin',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class UsersComponent implements OnInit {
  private isMaster: boolean = false;

  constructor(private loginService: LoginService,
              private usersService: UsersService) {}

  startGame(){
    this.usersService.startGame();
  }
  
  ngOnInit() {
    try {
      this.isMaster = JSON.parse(localStorage.getItem("user")).isMaster;
    } catch (e) { }
    }
}
