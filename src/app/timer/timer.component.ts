import { Component, OnInit } from '@angular/core';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  private countdown: any = 180;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.timerService.countdown().subscribe(timer => this.countdown = timer);
  }
}
