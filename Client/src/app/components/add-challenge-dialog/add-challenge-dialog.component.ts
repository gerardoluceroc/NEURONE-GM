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
  actions_required: {action_code: string, times_required: number, action_name: string}[] = [];
  challenges_required: {challenge_code: string, challenge_name: string}[] = [];
  points_awards: {point_code: string, amount: number, point_name: string}[] = [];
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
  usedActions: Action[] = [];
  usedChallenges: Challenge[] = [];
  usedPoints: Point[] = [];
  newAction: Action;
  newChallenge: Challenge;
  newPoint: Point;
  newPointAmount: number;
  newAmount: number;
  withCode: boolean;
  ngOnInit(): void {
    this.withCode = this.data.withCode;
  }
  onClickNO(){
    this.dialogRef.close();
  }
  onclickAddAction(){
    this.challenge.actions_required.push({action_code: this.newAction.code, times_required: this.newAmount, action_name: this.newAction.name});
    this.usedActions.push(this.newAction);
    const index = this.data.actions.indexOf(this.newAction);
    this.data.actions.splice(index, 1);
    this.newAmount = null;
    this.newAction = null;
  }
  onclickAddAChallenge(){
    this.challenge.challenges_required.push({challenge_code: this.newChallenge.code, challenge_name: this.newChallenge.name});
    this.usedChallenges.push(this.newChallenge);
    const index = this.data.challenges.indexOf(this.newChallenge);
    this.data.challenges.splice(index, 1);
    this.newChallenge = null;
  }
  onclickAddPoint(){
    this.challenge.points_awards.push({point_code: this.newPoint.code, amount: this.newPointAmount, point_name: this.newPoint.name});
    this.usedPoints.push(this.newPoint);
    const index = this.data.points.indexOf(this.newPoint);
    this.data.points.splice(index, 1);
    this.newPointAmount = null;
    this.newPoint = null;
  }
  takeOutAction(action){
    const index = this.challenge.actions_required.indexOf(action);
    let index2 = 0;
    for (let i = 0; i < this.usedActions.length; i++){
      if (this.usedActions[i].code === action.action_code){
        index2 = i;
      }
    }
    this.data.actions.push(this.usedActions[index2]);
    this.usedActions.splice(index2, 1);
    this.challenge.actions_required.splice(index, 1);
  }
  takeOutChallenge(challenge){
    const index = this.challenge.challenges_required.indexOf(challenge);
    let index2 = 0;
    for (let i = 0; i < this.usedChallenges.length; i++){
      if (this.usedChallenges[i].code === challenge.challenge_code){
        index2 = i;
      }
    }
    this.data.challenges.push(this.usedChallenges[index2]);
    this.usedChallenges.splice(index2, 1);
    this.challenge.challenges_required.splice(index, 1);
  }
  takeOutPoint(point){
    const index = this.challenge.points_awards.indexOf(point);
    let index2 = 0;
    for (let i = 0; i < this.usedPoints.length; i++){
      if (this.usedPoints[i].code === point.point_code){
        index2 = i;
      }
    }
    this.data.points.push(this.usedPoints[index2]);
    this.usedPoints.splice(index2, 1);
    this.challenge.points_awards.splice(index, 1);
  }
}
