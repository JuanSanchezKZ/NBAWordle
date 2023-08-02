import { Component, OnInit } from '@angular/core';
import { NbaGuessesService } from 'src/app/services/nba-guesses.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  randomPlayer!: any
  randomPlayerAge: number = 0

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

  returnArrow(a: number, b: number) {
    if (a > b) {
      return '↓'; 
    } else if (a < b) {
      return '↑' 
    } else {
      return ''; 
    }
  }

  checkHeighDifference(height: string) {
      const height1InchesTotal = this.parseHeight(height).feetPlayer * 12 + this.parseHeight(height).inchesPlayer;
      const height2InchesTotal = this.parseHeight(this.randomPlayer.HEIGHT).feetPlayer * 12 + this.parseHeight(this.randomPlayer.HEIGHT).inchesPlayer;

      return this.returnArrow(height1InchesTotal, height2InchesTotal);
    
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

  checkJerseyDifference(jersey: string) {
    return this.returnArrow(Number(jersey), Number(this.randomPlayer.JERSEY))
  }

  checkAgeDifference(age: number) {
    return this.returnArrow(Number(age), this.randomPlayerAge)
  }

  checkNumber(player: any, property: string) {
   let difference;
   if (property === "BIRTHDATE") {
    difference = Math.abs(Number(this.getPlayerAge(player[property])) - Number(this.getPlayerAge(this.randomPlayer[property]))) <= 2
   } else {
    difference =  Math.abs(Number(player[property]) - Number(this.randomPlayer[property])) <= 2  
   }
   
    return difference ? '#eadd65' : '#f5f2ec'  
  }

  parseHeight(height: string) {
    const feetHeightPlayer = Number(height.substring(0, height.indexOf('-')))
    const inchesHeightPlayer = Number(height.slice(height.indexOf('-') + 1));

    return {feetPlayer: feetHeightPlayer, inchesPlayer: inchesHeightPlayer}
  }

  checkHeight(height: string) {
    
    const height1InchesTotal = this.parseHeight(height).feetPlayer * 12 + this.parseHeight(height).inchesPlayer;
    const height2InchesTotal = this.parseHeight(this.randomPlayer.HEIGHT).feetPlayer * 12 + this.parseHeight(this.randomPlayer.HEIGHT).inchesPlayer;

    let difference = Math.abs(height1InchesTotal - height2InchesTotal) <= 2 

    if (difference) {
      return '#eadd65'
    } else {
      return '#f5f2ec'
    }
  }


  ngOnInit(): void {
    this.randomPlayer = this.guesses.generateRandomPlayer()
    this.randomPlayerAge = Number(this.getPlayerAge(this.randomPlayer.BIRTHDATE))
  }
}
