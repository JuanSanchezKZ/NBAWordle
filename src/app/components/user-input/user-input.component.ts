import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NbaApiService } from 'src/app/services/nba-api.service';
import { NbaGuesseService } from 'src/app/services/nba-guesse.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
})
export class UserInputComponent implements OnInit {
  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;
  searchedPlayer: any;
  constructor(private api: NbaApiService, private guesses: NbaGuesseService) {}

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
        this.api.searchPlayer(searchData).subscribe((data) => {
          this.searchedPlayer = data.data;
          console.log(this.searchedPlayer);
        });
      });
  }

  sendPlayer(player: any) {
    this.guesses.playerGuesses.push(player);
    console.log(this.guesses.playerGuesses);
  }

  ngOnInit(): void {
    this.searchPlayer();
  }
}
