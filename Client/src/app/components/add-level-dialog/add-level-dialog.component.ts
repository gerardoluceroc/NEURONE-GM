import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  message: string;
  name: string;
  code: string;
  description: string;
  point_required: string;
  point_threshold: number;
  points: [Point];
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
export class Level {
  name: string;
  code: string;
  description: string;
  point_required: string;
  point_threshold: number;
}
@Component({
  selector: 'app-add-level-dialog',
  templateUrl: './add-level-dialog.component.html',
  styleUrls: ['./add-level-dialog.component.css']
})
export class AddLevelDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddLevelDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  level: Level = new Level();
  withCode: boolean;
  ngOnInit(): void {
    this.level.name = this.data.name;
    this.level.code = this.data.code;
    this.level.description = this.data.description;
    this.level.point_required = this.data.point_required;
    this.level.point_required = this.data.points[0].code;
    this.level.point_threshold = this.data.point_threshold;
    this.withCode = this.data.withCode;
  }

  onClickNO(){
    this.dialogRef.close();
  }

}
