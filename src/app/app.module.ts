import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Pipe} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { UsersComponent } from './users/users.component';
import { routes } from './app.router';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    UsersComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [LoginService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
