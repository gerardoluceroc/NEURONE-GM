import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  message: string;
  actions: [Action];
  points: [Point];
  challenges: [Challenge];
  withCode: boolean;
}

export class Challenge {
  name: string;
  description: string;
  code: string;
  start_date: string;
  end_date: string;
  assign_to = 'everyone';
  actions_required: {action_code: string, times_required: number, action_name: string}[];
  challenges_required: {challenge_code: string, challenge_name: string}[];
  points_awards: {point_code: string, amount: number, point_name: string}[];
}
export class Action {
  name: string;
  description: string;
  repeatable: boolean;
  code: string;
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
  selector: 'app-add-challenge-dialog',
  templateUrl: './add-challenge-dialog.component.html',
  styleUrls: ['./add-challenge-dialog.component.css']
})
export class AddChallengeDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddChallengeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  challenge: Challenge = new Challenge();
  newAction: Action;
  newChallenge: Challenge;
  newPoint: Point;
  newPointAmount: number;
  newAmount: number;
  withCode: boolean;
  ngOnInit(): void {
    this.challenge.actions_required = [];
    this.challenge.points_awards = [];
    this.challenge.challenges_required = [];
    this.withCode = this.data.withCode;
  }
  onClickNO(){
    this.dialogRef.close();
  }
  onclickAddAction(){
    this.challenge.actions_required.push({action_code: this.newAction.code, times_required: this.newAmount, action_name: this.newAction.name});
    this.newAmount = null;
    this.newAction = null;
  }
  onclickAddAChallenge(){
    this.challenge.challenges_required.push({challenge_code: this.newChallenge.code, challenge_name: this.newChallenge.name});
    this.newChallenge = null;
  }
  onclickAddPoint(){
    this.challenge.points_awards.push({point_code: this.newPoint.code, amount: this.newPointAmount, point_name: this.newPoint.name});
    this.newPointAmount = null;
    this.newPoint = null;
  }
  takeOutAction(action){
    const index = this.challenge.actions_required.indexOf(action);
    console.log(index);
    this.challenge.actions_required.splice(index, 1);
  }
  takeOutChallenge(challenge){
    const index = this.challenge.challenges_required.indexOf(challenge);
    console.log(index);
    this.challenge.actions_required.splice(index, 1);
  }
  takeOutPoint(point){
    const index = this.challenge.points_awards.indexOf(point);
    console.log(index);
    this.challenge.points_awards.splice(index, 1);
  }
}
