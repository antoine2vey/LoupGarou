import { Component, OnInit } from '@angular/core';
import { TimerService } from './timer.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  providers: [UsersService]
})
export class TimerComponent implements OnInit {
  constructor(private timerService: TimerService, private usersService: UsersService) { }

  private countdown: any = this.timerService.formatDate(180);
  private animate: boolean = false;

  ngOnInit() {
    this.animate = this.usersService.animate;
    this.timerService.countdown().subscribe(timer => this.countdown = this.timerService.formatDate(timer));
  }

}
