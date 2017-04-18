import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';

import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';

import { TimerComponent } from './timer/timer.component';
import { TimerService } from './timer/timer.service';

import { UsersComponent } from './users/users.component';
import { UsersService } from './users/users.service';

import { ProxyService } from './proxy.service';

import { GameComponent } from './game/game.component';
import { GameService } from './game/game.service';

import { VoteComponent } from './vote/vote.component';
import { VoteService } from './vote/vote.service';

import { WolveChatComponent } from './wolve-chat/wolve-chat.component';
import { WolveChatService } from './wolve-chat/wolve-chat.service';

import { routes } from './app.router';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    UsersComponent,
    TimerComponent,
    GameComponent,
    VoteComponent,
    WolveChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [
    LoginService,
    ChatService,
    TimerService,
    UsersService,
    ProxyService,
    VoteService,
    WolveChatService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
