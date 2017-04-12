import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {LoginComponent} from "./login/login.component";

export const router: Routes = [
    { path: '', component: LoginComponent},
    { path: 'UsersLogged', component: UsersComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);