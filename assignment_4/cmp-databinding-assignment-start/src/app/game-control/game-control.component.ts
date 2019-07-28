import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  @Output('tick')
  tick: EventEmitter<number> = new EventEmitter<number>();
  counter = 0;
  private intervalId: number;

  constructor() { }

  ngOnInit() {
  }

  onStartGame() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => this.tick.emit(++this.counter), 1000);
    }
  }

  onStopGame() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
