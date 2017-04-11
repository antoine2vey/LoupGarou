import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [LoginService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
