import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  message: string;
  title: string;
  description: string;
  code: string;
  withCode: boolean;
}

export class Badge {
  title: string;
  description: string;
  code: string;
  file: File;
}

@Component({
  selector: 'app-add-badge-dialog',
  templateUrl: './add-badge-dialog.component.html',
  styleUrls: ['./add-badge-dialog.component.css']
})
export class AddBadgeDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddBadgeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  badge: Badge = new Badge();
  withCode: boolean;
  ngOnInit(): void {
    this.badge.title = this.data.title;
    this.badge.description = this.data.description;
    this.badge.code = this.data.code;
    this.withCode = this.data.withCode;
  }

  handleFileInput(files: FileList) {
    this.badge.file = files.item(0);
  }

  onClickNO(){
    this.dialogRef.close();
  }

}
