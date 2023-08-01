import { Injectable } from '@angular/core';
import { currentPlayers } from 'src/data';
import { teamData } from 'src/dataTeams';

@Injectable({
  providedIn: 'root',
})

export class NbaGuessesService {
  playerGuesses: any[] = [];
  guessesRemaining: number = 8;
  randomPlayer: any
  guesses: number = 0
  playerWon = false;

  constructor() { }

  generatePlayer(index: number) {
    const teamFound = teamData.find((a: any) => a.TeamID === currentPlayers[index].TEAM_ID)

    const playerData = { ...currentPlayers[index], ...teamFound }

    return playerData
  }

  generateRandomPlayer() {
    let randomNumberPlayer = Math.floor(Math.random() * currentPlayers.length);
    this.randomPlayer = this.generatePlayer(randomNumberPlayer)
    return this.generatePlayer(randomNumberPlayer)
  }


}
