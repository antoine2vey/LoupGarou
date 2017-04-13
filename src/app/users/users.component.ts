import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { LoginService } from '../login.service';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'admin',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class UsersComponent implements OnInit {
  private isMaster: boolean = false;
  private users: any = [];

  constructor(private loginService: LoginService,
    private usersService: UsersService) { }

  startGame() {
    console.log('start')
    this.usersService.startGame(true);
  }

  ngOnInit() {
    try {
      this.isMaster = JSON.parse(localStorage.getItem("user")).isMaster;
    } catch (e) { }
    this.loginService.getUsersConnected().subscribe(users => this.users = users);
    this.loginService.newUser().subscribe(user => this.users.push({ username: user }));
  }
}
