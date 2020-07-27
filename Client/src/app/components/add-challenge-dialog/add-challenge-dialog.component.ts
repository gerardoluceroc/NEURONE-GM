import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  message: string;
  actions: [Action];
}

export class Challenge {
  name: string;
  description: string;
  code: string;
  start_date: string;
  end_date: string;
  assign_to: string = 'everyone';
  actions_required: [{action_code: string, times_required: number}];
}
export class Action {
  name: string;
  description: string;
  repeatable: boolean;
  code: string;
}

@Component({
  selector: 'app-add-challenge-dialog',
  templateUrl: './add-challenge-dialog.component.html',
  styleUrls: ['./add-challenge-dialog.component.css']
})
export class AddChallengeDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddChallengeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  challenge: Challenge = new Challenge();
  newAction: string;
  newAmount: number;
  ngOnInit(): void {
    this.challenge.actions_required = [];
  }
  onClickNO(){
    this.dialogRef.close();
  }
  onclickAdd(){
    this.challenge.actions_required.push({action_code: this.newAction, times_required: this.newAmount});
    this.newAmount = null;
    this.newAction = null;
  }
  takeOutAction(action_required){
    const index = this.challenge.actions_required.indexOf(action_required);
    console.log(index);
    this.challenge.actions_required.splice(index,1);
  }
}
