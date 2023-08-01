import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ModalHowToPlayComponent } from '../modal-how-to-play/modal-how-to-play.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(public dialog: MatDialog) { }

  openDialog(): void {
  
    const dialogRef = this.dialog.open(ModalHowToPlayComponent, {
      width: '350px',
    });
  }

  ngOnInit(): void {
  }

}
