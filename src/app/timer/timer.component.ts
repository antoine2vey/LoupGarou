import { Component, OnInit } from '@angular/core';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  constructor(private timerService: TimerService) { }

  private countdown: any = this.timerService.formatDate(180);

  ngOnInit() {
    this.timerService.countdown().subscribe(timer => this.countdown = this.timerService.formatDate(timer));
  }
}
