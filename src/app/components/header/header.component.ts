import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { NbaGuessesService } from 'src/app/services/nba-guesses.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, public guesses: NbaGuessesService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: {
        playerName: this.guesses.randomPlayer.DISPLAY_FIRST_LAST,
        image: `https://cdn.nba.com/headshots/nba/latest/1040x760/${this.guesses.randomPlayer.PERSON_ID}.png`,
        amountOfGuesses: this.guesses.guesses,
        description: this.guesses.guessesRemaining > 0 ? `You solved it in ${this.guesses.guesses} guesses` : 'Oops! You ran out of guesses. You\'ve lost!',
        isSilhouette: this.guesses.playerWon ? false : true
      },
    });
  }


  ngOnInit(): void {
  }

}
