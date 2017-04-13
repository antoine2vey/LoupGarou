import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
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
  private role: any;
  subscription: Subscription;

  constructor(
    private loginService: LoginService,
    private usersService: UsersService,
    private chatService: ChatService,
  ) {
    this.subscription = this.chatService.giveRole().subscribe(
      role => {
        this.role = role;
      }
    );

    this.loginService.getUsersConnected().subscribe(users => this.users = users);

  }

  startGame() {
    this.usersService.startGame(true);
  }

  ngOnInit() {
    try {
      this.isMaster = JSON.parse(localStorage.getItem("user")).isMaster;
    } catch (e) { }
    this.loginService.newUser().subscribe(user => this.users.push({ username: user }));
  }
}
