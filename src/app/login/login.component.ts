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
  private connection: any;
  private user: any;
  private error: any = '';
  private username: string = '';

  constructor(private loginService: LoginService) { }

  login(username) {
    this.loginService.login(username);
    this.username = '';
  }

  ngOnInit() {
    this.connection = this.loginService.getError().subscribe(error => {
      this.error = error;
    })
    this.user = this.loginService.getUser().subscribe(user => {
      localStorage.setItem("user", JSON.stringify(user));
    })
  }
}
