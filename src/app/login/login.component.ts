import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  private socket: any;
  private error: any = '';
  private users: any = [];

  constructor(private loginService: LoginService) { }

  login(username) {
    this.loginService.login(username);
  }

  ngOnInit() {
    this.loginService.getError().subscribe(error => this.error = error);
    this.loginService.getUser().subscribe(user => localStorage.setItem("user", JSON.stringify(user)));
    this.loginService.getUsersConnected().subscribe(users => this.users = users);
    this.loginService.newUser().subscribe(user => this.users.push({username: user}));
  }
}
