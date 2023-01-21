import { Injectable } from '@angular/core';
import { NbaApiService } from './nba-api.service';

@Injectable({
  providedIn: 'root',
})
export class NbaGuesseService {
  playerGuesses: any[] = [];
  rightPlayer: any;

  constructor(private api: NbaApiService) {}

  generatePlayer() {
    let randomNumberPlayer = Math.floor(Math.random() * 250);
    this.api.getPlayer(randomNumberPlayer).subscribe((data) => {
      console.log(data);
      this.rightPlayer = data;
    });
  }
}
