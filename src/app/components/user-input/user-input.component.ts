import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NbaGuessesService } from 'src/app/services/nba-guesses.service';
import { currentPlayers } from 'src/data';
import { teamData } from 'src/dataTeams';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
})
export class UserInputComponent implements OnInit {
  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;
  searchedPlayer: any;
  constructor(public guesses: NbaGuessesService, public dialog: MatDialog) { }

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

    const playerData = { ...player, ...teamFound }

    this.guesses.guessesRemaining--
    this.guesses.guesses++

    this.guesses.playerGuesses.push(playerData);


    if (player.PERSON_ID === this.guesses.randomPlayer.PERSON_ID || this.guesses.guessesRemaining === 0) {
      this.guesses.playerWon = true
      this.openDialog()


    }



  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: {
        playerName: this.guesses.randomPlayer.DISPLAY_FIRST_LAST,
        image: `https://cdn.nba.com/headshots/nba/latest/1040x760/${this.guesses.randomPlayer.PERSON_ID}.png`,
        amountOfGuesses: this.guesses.guesses,
        description: this.guesses.guessesRemaining === 0 ? 'Oops! You ran out of guesses. You\'ve lost!' : `You solved it in ${this.guesses.guesses} guesses`,
        isSilhouette: this.guesses.playerWon ? false : true
      },
    });
  }

  ngOnInit(): void {
    this.searchPlayer();
  }
}
