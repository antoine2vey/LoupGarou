import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  private message: string = '';
  private connection: any;
  private messages: any = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
    this.connection = this.chatService.login().subscribe(message => {
      const formattedMsg = `${message} à rejoint la salle`
      this.messages.push({ message: formattedMsg });
    })
  }

  messageSent(message) {
    this.chatService.sendMessage(message);
    this.message = '';
  }
}
