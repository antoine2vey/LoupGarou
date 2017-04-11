import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})

export class ChatComponent implements OnInit {
  private message: string = '';
  private connection: any;
  private messages: any = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      console.log(message);
      this.messages.push(message);
    })
  }

  messageSent(message) {
    this.chatService.sendMessage(message);
  }



}
