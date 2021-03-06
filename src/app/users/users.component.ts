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
  private users:any = [];

  constructor(private loginService: LoginService,
    private usersService: UsersService) { 
      this.isMaster = JSON.parse(localStorage.getItem("user")).isMaster;
      this.loginService.getUsers().subscribe(users => { this.users = users; });
    }

  startGame() {
    this.usersService.startGame();
  }

  ngOnInit() {
    try {
      this.isMaster = JSON.parse(localStorage.getItem("user")).isMaster;
    } catch (e) { }
    this.loginService.getUsers().subscribe(users => {      
      this.users = users;
    });
    this.loginService.newUser().subscribe(user => this.users.push({ username: user }));
  }
}
