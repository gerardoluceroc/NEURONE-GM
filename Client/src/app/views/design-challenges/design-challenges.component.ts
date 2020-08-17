import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {EndpointsService} from '../../endpoints/endpoints.service';
import {MatDialog} from '@angular/material/dialog';
import {AddChallengeDialogComponent} from '../../components/add-challenge-dialog/add-challenge-dialog.component';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-design-challenges',
  templateUrl: './design-challenges.component.html',
  styleUrls: ['./design-challenges.component.css']
})
export class DesignChallengesComponent implements OnInit {

  constructor(protected endpointsService: EndpointsService, public dialog: MatDialog, public translate: TranslateService) { }
  table = new MatTableDataSource([]);
  challenges = [];
  actions = [];
  points = [];
  displayedColumns: string[] = ['name'];
  selectedRow = null;
  focusApp: any = {};
  ngOnInit(): void {
    this.getActiveApp();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filter = filterValue.trim().toLowerCase();
  }

  select(row){
    this.selectedRow = row;
  }
  getActiveApp(){
    this.endpointsService.getActiveApp().subscribe((data: {data: object, ok: boolean}) => { // Success
        this.focusApp = data.data;
        this.getChallenges();
        this.getActions();
        this.getPoints();
      },
      (error) => {
        console.error(error);
      });
  }
  getChallenges(){
    this.endpointsService.getChallenges(this.focusApp.code).subscribe((data: {
        data: any[]; ok: boolean} ) => { // Success
        this.challenges = data.data;
        this.table.data = this.challenges;
      },
      (error) => {
        console.error(error);
      });
  }
  getActions(){
    this.endpointsService.getActions(this.focusApp.code).subscribe((data: {
        actions: any[]; ok: boolean} ) => { // Success
        this.actions = data.actions;
      },
      (error) => {
        console.error(error);
      });
  }
  getPoints(){
    this.endpointsService.getPoints(this.focusApp.code).subscribe((data: {
        data: any[]; ok: boolean} ) => { // Success
        this.points = data.data;
      },
      (error) => {
        console.error(error);
      });
  }
  async openAddAChallengeDialog() {
    let message;
    await this.translate.get('challenge.addChallengeTitle').subscribe(res => {
      message = res;
    });
    const dialogRef = this.dialog.open(AddChallengeDialogComponent, {
      data: {
        message: message,
        actions: this.actions,
        points: this.points,
        challenges: this.challenges,
        withCode: false
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log(res);
        this.endpointsService.postChallenge(res, this.focusApp.code).subscribe((data: { data: any; ok: boolean }) => {
          this.getChallenges();
        }, (error) => {
          console.error(error);
        });
      }
    });
  }
  async openEditChallengeDialog() {
    let message;
    await this.translate.get('challenge.editChallengeTitle').subscribe(res => {
      message = res;
    });
    const dialogRef = this.dialog.open(AddChallengeDialogComponent, {
      data: {
        message,
        challenge: this.selectedRow,
        actions: this.actions,
        points: this.points,
        challenges: this.challenges,
        withCode: true
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.endpointsService.putChallenge(res, this.focusApp.code, this.selectedRow.code).subscribe((data: { data: any; ok: boolean }) => {
          this.getChallenges();
          this.selectedRow = null;
        }, (error) => {
          console.error(error);
        });
      }
    });
  }
  deleteChallenge(){
    this.endpointsService.deleteChallenge(this.focusApp.code, this.selectedRow.code).subscribe( () => {
      this.getChallenges();
      this.selectedRow = null;
    },  (error) => {
      console.error(error);
    });
  }
}
