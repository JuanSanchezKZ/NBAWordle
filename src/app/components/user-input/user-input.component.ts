import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NbaGuesseService } from 'src/app/services/nba-guesse.service';
import { currentPlayers } from 'src/data';
import { teamData } from 'src/dataTeams';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
})
export class UserInputComponent implements OnInit {
  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;
  searchedPlayer: any;
  constructor(private guesses: NbaGuesseService) {}

  searchPlayer() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        map((event: any) => {
          return event.target.value;
        }),
        distinctUntilChanged()
      )
      .subscribe((searchData: string) => {
      this.searchedPlayer = currentPlayers.filter((a) => a.DISPLAY_FIRST_LAST.toLowerCase().includes(searchData.toLowerCase()))
      
      });
  }

  sendPlayer(player: any) {
    const teamFound = teamData.find((a: any) => a.TeamID === player.TEAM_ID)

    const playerData = {...player, ...teamFound}

    this.guesses.playerGuesses.push(playerData);
  
  }

  ngOnInit(): void {
    this.searchPlayer();
  }
}
