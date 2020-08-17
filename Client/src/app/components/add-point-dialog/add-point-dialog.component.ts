import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


export interface DialogData {
  message: string;
  name: string;
  code: string;
  abbreviation: string;
  initial_points: number;
  max_points: number;
  daily_max: number;
  is_default: boolean;
  hidden: boolean;
  withCode: boolean;
}

export class Point {
  name: string;
  code: string;
  abbreviation: string;
  initial_points: number;
  max_points: number;
  daily_max: number;
  is_default: boolean;
  hidden: boolean;
}
@Component({
  selector: 'app-add-point-dialog',
  templateUrl: './add-point-dialog.component.html',
  styleUrls: ['./add-point-dialog.component.css']
})
export class AddPointDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddPointDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  point: Point = new Point();
  withCode: boolean;
  ngOnInit(): void {
    this.point.name = this.data.name;
    this.point.code = this.data.code;
    this.point.abbreviation = this.data.abbreviation;
    this.point.initial_points = this.data.initial_points;
    this.point.max_points = this.data.max_points;
    this.point.daily_max = this.data.daily_max;
    this.point.is_default = this.data.is_default;
    this.point.hidden = this.data.hidden;
    this.withCode = this.data.withCode;
  
  }

  onClickNO(){
    this.dialogRef.close();
  }

}
