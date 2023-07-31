import { Component, OnInit } from '@angular/core';
import { NbaGuesseService } from 'src/app/services/nba-guesse.service';




@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {


  constructor(public guesses: NbaGuesseService) {}
  
getPlayerAge(index: number) {
 const playerBirthdate =  new Date(this.guesses.playerGuesses[index].BIRTHDATE);
 const dateNow = new Date();
 let age = dateNow.getFullYear() - playerBirthdate.getFullYear()
 const month = dateNow.getMonth() - playerBirthdate.getMonth();

if (month < 0 || (month === 0 && dateNow.getDate() < playerBirthdate.getDate())) {
  age--;
}

return age
} 

  ngOnInit(): void {
    this.guesses.generateRandomPlayer()
   
  }
}
