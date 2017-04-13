import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

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
  private username: string = '';


  constructor(private router: Router, private loginService: LoginService) { }

  login(username) {
    this.loginService.login(username);
    this.username = '';
  }

  ngOnInit() {
    this.loginService.getError().subscribe(error => this.error = error);
    this.loginService.getUser().subscribe(user => {
      localStorage.setItem("user", JSON.stringify(user));
      this.router.navigate(['UsersLogged']);
    });
    this.loginService.getUsersConnected().subscribe(users => this.users = users);
    this.loginService.newUser().subscribe(user => this.users.push({ username: user }));
  }
}
