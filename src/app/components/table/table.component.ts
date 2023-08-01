import { Component, OnInit } from '@angular/core';
import { NbaGuessesService } from 'src/app/services/nba-guesses.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  randomPlayer!: any

  constructor(public guesses: NbaGuessesService) { }


  getDivision(conference: string) {

    let conferenceShort: string = '';
    switch (conference) {
      case "Northwest":
        conferenceShort = "NW"
        break;
      case "Pacific":
        conferenceShort = "PAC"
        break;
      case "Southwest":
        conferenceShort = "SE"
        break;
      case "Atlantic":
        conferenceShort = "ATL"
        break;
      case "Central":
        conferenceShort = "CEN"
        break;
      case "Southeast":
        conferenceShort = "SE"
    }

    return conferenceShort
  }

  getPlayerAge(birthdate: string) {
    const playerBirthdate = new Date(birthdate);
    const dateNow = new Date();
    let age = dateNow.getFullYear() - playerBirthdate.getFullYear()
    const month = dateNow.getMonth() - playerBirthdate.getMonth();

    if (month < 0 || (month === 0 && dateNow.getDate() < playerBirthdate.getDate())) {
      age--;
    }

    return age
  }

  checkNumber(player: any, property: string) {
    let difference;
    if (property = 'BIRTHDATE') {
      difference = this.getPlayerAge(player[property]) - this.getPlayerAge(this.randomPlayer[property]);
    } else {
      difference = player[property] - this.randomPlayer[property];
    }

    if (difference >= -2 && difference <= 2) {
      return '#eadd65'
    } else {
      return '#f5f2ec'
    }
  }

  parseHeight(height: string) {
    const feetHeightPlayer = Number(height.substring(0, height.indexOf('-')))
    const inchesHeightPlayer = Number(height.slice(height.indexOf('-') + 1));

    return `${feetHeightPlayer}' ${inchesHeightPlayer}"`
  }

  checkHeight(playerHeight: string) {
    const feetHeightPlayer = Number(playerHeight.substring(0, playerHeight.indexOf('-')))
    const inchesHeightPlayer = Number(playerHeight.slice(playerHeight.indexOf('-') + 1));
    const feetHeightRandomPlayer = Number(this.randomPlayer.HEIGHT.substring(0, this.randomPlayer.HEIGHT.indexOf('-')))
    const inchesHeightRandomPlayer = Number(this.randomPlayer.HEIGHT.slice(this.randomPlayer.HEIGHT.indexOf('-') + 1));

    let differenceFeet = feetHeightPlayer - feetHeightRandomPlayer

    let differenceInches = inchesHeightPlayer - inchesHeightRandomPlayer


    if (differenceFeet === 1 && differenceInches === 10 || differenceInches === -10 || differenceInches === 11 || differenceInches === -11) {
      return '#eadd65'
    } else if (differenceFeet >= -2 && differenceFeet <= 2 && differenceInches >= -2 && differenceInches <= 2) {
      return '#eadd65'
    }
    else {
      return '#f5f2ec'
    }
  }


  ngOnInit(): void {
    this.randomPlayer = this.guesses.generateRandomPlayer()

  }
}
