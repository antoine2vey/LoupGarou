import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { VoteService } from './vote.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  constructor(
    private loginService: LoginService, 
    private voteService: VoteService,
    private usersService: UsersService
  ) { }  
  private users: any;
  private userIsDead: boolean = false;
  private deadUsers: any = [];
  private connection: any;  

  private isWolf: any;
  private isNight: any = true;

  setVote(user) {     
    console.log('changed');
    this.voteService.sendVote(user);
  }

  ngOnInit() { 
    this.connection = this.loginService.getUsers().subscribe(users => {      
      this.users = users;  
      const { isDead } = JSON.parse(localStorage.getItem('user'));
      if (isDead) {
        this.userIsDead = true;
      }          
    }); 

    this.connection = this.voteService.displayVotes().subscribe(votes => {
      this.deadUsers = votes;
    });

    this.usersService.getWeather().subscribe(weather => {
      this.isNight = weather === 'night';
      this.isWolf = JSON.parse(localStorage.getItem('role')).role === 'Loup';

      console.log(this.isNight)
      console.log(this.isWolf)
    });
  }
}
