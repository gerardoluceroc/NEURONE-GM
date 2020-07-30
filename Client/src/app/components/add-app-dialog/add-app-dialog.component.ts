import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  message: string;
  name: string;
  description: string;
  owner: number;
  code: string;
  withCode: boolean;
}

export class App {
  name: string;
  description: string;
  owner: number;
  code: string;
}


@Component({
  selector: 'app-add-app-dialog',
  templateUrl: './add-app-dialog.component.html',
  styleUrls: ['./add-app-dialog.component.css']
})
export class AddAppDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddAppDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  app: App = new App();
  withCode: boolean;
  ngOnInit(): void {
    this.app.name = this.data.name;
    this.app.description = this.data.description;
    this.app.code = this.data.code;
    this.withCode = this.data.withCode;
  }
  onClickNO(){
    this.dialogRef.close();
  }
}
