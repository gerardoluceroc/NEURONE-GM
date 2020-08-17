import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  message: string;
  actions: [Action];
  points: [Point];
  challenge: any;
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
  actions = new Array();
  challenges = new Array();
  points = new Array();
  newAction: Action;
  newChallenge: Challenge;
  newPoint: Point;
  newPointAmount: number;
  newAmount: number;
  withCode: boolean;
  ngOnInit(): void {
    this.withCode = this.data.withCode;
    this.actions = Object.create(this.data.actions);
    this.challenges = Object.create(this.data.challenges);
    this.points = Object.create(this.data.points);
    //Se llena el formulario de edición con los datos provenientes del desafío que se quiere editar
    if(this.data.challenge){
      this.challenge.name = this.data.challenge.name;
      this.challenge.code = this.data.challenge.code;
      this.challenge.description = this.data.challenge.description;
      this.challenge.start_date = this.data.challenge.start_date;
      this.challenge.end_date = this.data.challenge.end_date;
      let index;
      //se saca de las opciones de requisito de challenge al propio challenge
      for(let i = 0; i<this.challenges.length; i++){
        if(this.challenges[i].code === this.challenge.code){
          index = i;
          break;
        }
      }
      this.challenges.splice(index, 1);
      //En este for se cargan las acciones que tiene el desafío que se quiere editar
      for(let i = 0; i<this.data.challenge.actions_required.length; i++){
        this.challenge.actions_required.push({
          action_code: this.data.challenge.actions_required[i].action.code,
          times_required: this.data.challenge.actions_required[i].times_required,
          action_name: this.data.challenge.actions_required[i].action.name});
        this.usedActions.push(this.data.challenge.actions_required[i].action);
        //Dentro de las acciones elegibles para utilizar en el desafío, se quitan las que ya provenían del desafío que se está editando
        for(let j = 0 ; j<this.actions.length; j++){
          if(this.actions[j].code === this.data.challenge.actions_required[i].action.code){
            index = j;
            break;
          }
        }
        this.actions.splice(index, 1);
      }
      //En este for se cargan los desafíos requeridos que tiene el desafío que se quiere editar
      for(let i = 0; i<this.data.challenge.challenges_required.length; i++){
        this.challenge.challenges_required.push({
          challenge_code: this.data.challenge.challenges_required[i].challenge.code,
          challenge_name: this.data.challenge.challenges_required[i].challenge.name});
        this.usedChallenges.push(this.data.challenge.challenges_required[i].challenge);
        //Dentro de los desafíos elegibles para utilizar en el desafío, se quitan las que ya provenían del desafío que se está editando
        for(let j = 0 ; j<this.challenges.length; j++){
          if(this.challenges[j].code === this.data.challenge.challenges_required[i].challenge.code){
            index = j;
            break;
          }
        }
        this.challenges.splice(index, 1);
      }
      //En este for se cargan los puntos de recompensa que tiene el desafío que se quiere editar
      for(let i = 0; i<this.data.challenge.points_awards.length; i++){
        this.challenge.points_awards.push({
          point_code: this.data.challenge.points_awards[i].point.code,
          point_name: this.data.challenge.points_awards[i].point.name,
          amount: this.data.challenge.points_awards[i].amount
        });
        this.usedPoints.push(this.data.challenge.points_awards[i].point);
        //Dentro de los puntos elegibles para utilizar en el desafío, se quitan las que ya provenían del desafío que se está editando
        for(let j = 0 ; j<this.points.length; j++){
          if(this.points[j].code === this.data.challenge.points_awards[i].point.code){
            index = j;
            break;
          }
        }
        this.points.splice(index, 1);
      }
    }
  }
  onClickNO(){
    this.dialogRef.close();
  }
  onclickAddAction(){
    this.challenge.actions_required.push({action_code: this.newAction.code, times_required: this.newAmount, action_name: this.newAction.name});
    this.usedActions.push(this.newAction);
    const index = this.actions.indexOf(this.newAction);
    this.actions.splice(index, 1);
    this.newAmount = null;
    this.newAction = null;
  }
  onclickAddAChallenge(){
    this.challenge.challenges_required.push({challenge_code: this.newChallenge.code, challenge_name: this.newChallenge.name});
    this.usedChallenges.push(this.newChallenge);
    const index = this.challenges.indexOf(this.newChallenge);
    this.challenges.splice(index, 1);
    this.newChallenge = null;
  }
  onclickAddPoint(){
    this.challenge.points_awards.push({point_code: this.newPoint.code, amount: this.newPointAmount, point_name: this.newPoint.name});
    this.usedPoints.push(this.newPoint);
    const index = this.points.indexOf(this.newPoint);
    this.points.splice(index, 1);
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
    this.actions.push(this.usedActions[index2]);
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
    this.challenges.push(this.usedChallenges[index2]);
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
    this.points.push(this.usedPoints[index2]);
    this.usedPoints.splice(index2, 1);
    this.challenge.points_awards.splice(index, 1);
  }
}
