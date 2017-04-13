import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TimerService } from './timer.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  private countdown: any = this.timerService.formatDate(180);
  private animate: boolean = false;
  subscription: Subscription;

  constructor(private timerService: TimerService, private usersService: UsersService) {
    this.subscription = usersService.newAnimate$.subscribe(
      animate => {
        this.animate = animate;
      }
    );
  }

  ngOnInit() {
    this.timerService.countdown().subscribe(timer => this.countdown = this.timerService.formatDate(timer));
  }
}
