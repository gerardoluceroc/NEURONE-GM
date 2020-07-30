import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {EndpointsService} from '../../endpoints/endpoints.service';
import {MatDialog} from '@angular/material/dialog';
import {AddChallengeDialogComponent} from '../../components/add-challenge-dialog/add-challenge-dialog.component';

@Component({
  selector: 'app-design-challenges',
  templateUrl: './design-challenges.component.html',
  styleUrls: ['./design-challenges.component.css']
})
export class DesignChallengesComponent implements OnInit {

  constructor(protected endpointsService: EndpointsService, public dialog: MatDialog) { }
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
        console.log(this.challenges);
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
  openAddAChallengeDialog(){
    const dialogRef = this.dialog.open(AddChallengeDialogComponent, {
      data: {message: 'Create New Challenge', actions: this.actions, points: this.points, challenges: this.challenges, withCode: false},
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        console.log(res);
        this.endpointsService.postChallenge(res, this.focusApp.code).subscribe((data: { data: any; ok: boolean }) => {
          this.getChallenges();
        }, (error) => {
          console.error(error);
        });
      }
    });
  }
}
