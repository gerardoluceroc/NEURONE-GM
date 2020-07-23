import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  message: string;
  name: string;
  description: string;
  repeatable: boolean;
}

export class Action {
  name: string;
  description: string;
  repeatable: boolean;
}

@Component({
  selector: 'app-add-action-dialog',
  templateUrl: './add-action-dialog.component.html',
  styleUrls: ['./add-action-dialog.component.css']
})
export class AddActionDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddActionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  action: Action = new Action();
  ngOnInit(): void {
    this.action.name = this.data.name;
    this.action.description = this.data.description;
    this.action.repeatable = this.data.repeatable;
  }

  onClickNO(){
    this.dialogRef.close();
  }

}
