import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { UsersComponent } from './users/users.component';
import {LoginComponent} from "./login/login.component";
import {ChatComponent} from "./chat/chat.component";

export const router: Routes = [
  { path: '', component: LoginComponent },
  { path: 'UsersLogged', component: GameComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
