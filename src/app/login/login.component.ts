import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit {
  private socket: any;
  private connection: any;
  private error: any = '';

  constructor(private loginService: LoginService) {}

  login(username) {
    this.loginService.login(username);
  }

  ngOnInit() {    
    this.connection = this.loginService.getError().subscribe(error => {
      this.error = error;
    })
  }
}
