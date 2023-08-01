import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalDialog } from 'src/app/interfaces/dialog';

@Component({
  selector: 'app-modal-how-to-play',
  templateUrl: './modal-how-to-play.component.html',
  styleUrls: ['./modal-how-to-play.component.css']
})
export class ModalHowToPlayComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalHowToPlayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalDialog,) { }

  ngOnInit(): void {
  }

}
