import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  constructor(private gameService: GameService) { }
  private villagersWon: any;
  private wolvesWon: any;  

  ngOnInit() {
    this.gameService.villagersWon().subscribe(win => {      
      console.log('in component: villageois', win)  
      this.villagersWon = win;
    });
    this.gameService.wolvesWon().subscribe(win => {    
      console.log('in component: loup', win)  
      this.wolvesWon = win;
    });
  }
}
