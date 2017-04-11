import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';


@Component({
  selector: 'admin',
  templateUrl: './users.component.html',
  styleUrls: ['./admin.component.css'],
  //providers: [ LoginService ]
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
