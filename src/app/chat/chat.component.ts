import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { LoginService } from '../login.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  private message: string = '';
  private isNight: any;
  private userIsDead: boolean = false;  
  private messages: any = [];  
  private weather: any;

  constructor(
    private chatService: ChatService,
    private loginService: LoginService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.chatService.getMessages().subscribe(message => {
      console.log(message);
      this.messages.push(message);
    })
    this.chatService.login().subscribe(message => {
      const formattedMsg = `${message} à rejoint la salle`
      this.messages.push({ message: formattedMsg });
    })
    this.chatService.giveRole().subscribe(role => {
      localStorage.setItem('role', JSON.stringify({role}));           
      this.messages.push({message: `Votre role est ${role}`});
    });
    this.loginService.getUsers().subscribe(data => {
      const { isDead } = JSON.parse(localStorage.getItem('user'));
      if (isDead) {
        this.userIsDead = true;
      }
    });

    this.usersService.getWeather().subscribe(weather => {
      const { role } = JSON.parse(localStorage.getItem('role'));
      this.weather = weather;
      this.isNight = this.weather === 'night';      
    
      if (this.isNight) {
        this.userIsDead = false;
      } else {
        this.userIsDead = true;
      }
    });
  }

  messageSent(message) {
    this.chatService.sendMessage(message);
    this.message = '';
  }
}
