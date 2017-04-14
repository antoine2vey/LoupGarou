import { Component, OnInit } from '@angular/core';
import { WolveChatService } from './wolve-chat.service';
import { LoginService } from '../login.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'wolve-chat',
  templateUrl: './wolve-chat.component.html',
  styleUrls: ['./wolve-chat.component.css']
})
export class WolveChatComponent implements OnInit {
  private message: string = '';
  private canTalkAtNight: any;
  private userIsDead: boolean = false;  
  private messages: any = [];  
  private isNight: boolean = true;
  private hasChat: any = false;
  private isLittleGirl: any = false;

  constructor(
    private wolveChatService: WolveChatService,
    private loginService: LoginService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.wolveChatService.getMessages().subscribe(message => {
      console.log(message);
      this.messages.push(message);
    })
    this.loginService.getUsers().subscribe(data => {
      const { isDead } = JSON.parse(localStorage.getItem('user'));
      if (isDead) {
        this.userIsDead = true;
      }
    });
    this.usersService.getWeather().subscribe(weather => {
      const { role } = JSON.parse(localStorage.getItem('role'));      
      this.hasChat = (role === 'Loup' || role === 'Petite fille');
      this.isLittleGirl = (role === 'Petite fille');
      this.isNight = weather === 'night';      
    
      if (this.isNight) {
        this.userIsDead = false;
      } else {
        this.userIsDead = true;
      }
    });
  }

  messageSent(message) {
    this.wolveChatService.sendMessage(message);
    this.message = '';
  }
}
