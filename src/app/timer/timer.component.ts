import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  private countdown: any;

  constructor(private timerComponent : TimerComponent) { }

  ngOnInit() {
      this.timerComponent.countdown().subscribe(timer => this.countdown = timer);
  }

}
