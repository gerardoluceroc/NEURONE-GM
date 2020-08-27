import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  message: string;
  name: string;
  description: string;
  repeatable: boolean;
  code: string;
  withCode: boolean;
}

export class Action {
  name: string;
  description: string;
  repeatable: boolean;
  code: string;
  file: File;
}

@Component({
  selector: 'app-add-action-dialog',
  templateUrl: './add-action-dialog.component.html',
  styleUrls: ['./add-action-dialog.component.css']
})
export class AddActionDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddActionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  action: Action = new Action();
  withCode: boolean;
  ngOnInit(): void {
    this.action.name = this.data.name;
    this.action.description = this.data.description;
    this.action.repeatable = this.data.repeatable;
    this.action.code = this.data.code;
    this.withCode = this.data.withCode;
  }

  handleFileInput(files: FileList) {
    this.action.file = files.item(0);
  }

  onClickNO(){
    this.dialogRef.close();
  }

}
