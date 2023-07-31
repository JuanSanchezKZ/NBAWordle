import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentPlayers} from 'src/data';
import { teamData } from 'src/dataTeams';

@Injectable({
  providedIn: 'root',
})
export class NbaGuesseService {
  playerGuesses: any[] = [];

  constructor() {}

  generatePlayer(index: number) {
    const teamFound = teamData.find((a: any) => a.TeamID === currentPlayers[index].TEAM_ID)

    const playerData = {...currentPlayers[index], ...teamFound}

    return playerData
  }

  generateRandomPlayer() {
    let randomNumberPlayer = Math.floor(Math.random() * currentPlayers.length);
    
   return this.generatePlayer(randomNumberPlayer)
  }


}
