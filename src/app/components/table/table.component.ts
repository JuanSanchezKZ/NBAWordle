import { Component, OnInit } from '@angular/core';
import { NbaGuesseService } from 'src/app/services/nba-guesse.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  constructor(public guesses: NbaGuesseService) {}

  ngOnInit(): void {
    this.guesses.generatePlayer();
  }
}
