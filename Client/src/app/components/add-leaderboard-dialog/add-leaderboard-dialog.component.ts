import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../add-action-dialog/add-action-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {EndpointsService} from '../../endpoints/endpoints.service';

export class Leaderboard {
  name: string;
  parameter: string;
  // tslint:disable-next-line:variable-name
  element_code: string;
}

@Component({
  selector: 'app-add-leaderboard-dialog',
  templateUrl: './add-leaderboard-dialog.component.html',
  styleUrls: ['./add-leaderboard-dialog.component.css']
})
export class AddLeaderboardDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddLeaderboardDialogComponent>, public translate: TranslateService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, public formBuilder: FormBuilder,
              protected endpointsService: EndpointsService) {}

  firstFormGroup: FormGroup;
  types = [];
  secondFormGroup: FormGroup;
  type: {id, name} = {id: '', name: ''};
  points = [];
  actions = [];
  selectedElement: any;
  leaderboard: Leaderboard = new Leaderboard();
  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.translate.get('actions').subscribe(res => {
      this.types.push({id: 'actions', name: res});
    });
    this.translate.get('points').subscribe(res => {
      this.types.push({id: 'points', name: res});
    });
    this.getActions();
    this.getPoints();
  }
  getActions(){
    this.endpointsService.getActions('NEURONE-A-DAY').subscribe((data: {
        actions: any[]; ok: boolean} ) => { // Success
        this.actions = data.actions;
      },
      (error) => {
        console.error(error);
      });
  }
  getPoints(){
    this.endpointsService.getPoints('NEURONE-A-DAY').subscribe((data: {
        data: any[]; ok: boolean} ) => { // Success
        this.points = data.data;
      },
      (error) => {
        console.error(error);
      });
  }
  onClickNO(){
    this.dialogRef.close();
    console.log(this.leaderboard);
  }
  onChangeType($event){
    this.type = $event.value;
    this.leaderboard.parameter = this.type.id;
  }
  onChangeElement($event){
    this.selectedElement = $event.value;
    this.leaderboard.element_code = $event.value.code;
  }

}
