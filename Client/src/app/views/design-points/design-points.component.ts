import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {EndpointsService} from '../../endpoints/endpoints.service';
import {MatDialog} from '@angular/material/dialog';
import {AddPointDialogComponent} from '../../components/add-point-dialog/add-point-dialog.component';

@Component({
  selector: 'app-design-points',
  templateUrl: './design-points.component.html',
  styleUrls: ['./design-points.component.css']
})
export class DesignPointsComponent implements OnInit {

  constructor(protected endpointsService: EndpointsService, public dialog: MatDialog) { }
  table = new MatTableDataSource([]);
  points = [];
  displayedColumns: string[] = ['name'];
  selectedRow = null;
  focusApp: any = {};
  ngOnInit(): void {
    this.getActiveApp();
  }
  getActiveApp(){
    this.endpointsService.getActiveApp().subscribe((data: {data: object, ok: boolean}) => { // Success
        this.focusApp = data.data;
        this.getPoints();
      },
      (error) => {
        console.error(error);
      });
  }
  getPoints(){
    this.endpointsService.getPoints(this.focusApp.code).subscribe((data: {
        data: any[]; ok: boolean} ) => { // Success
        this.points = data.data;
        this.table.data = this.points;
      },
      (error) => {
        console.error(error);
      });
  }
  openAddPointDialog(){
    const dialogRef = this.dialog.open(AddPointDialogComponent, {
      data: {message: 'Create New Point'},
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.endpointsService.postPoint(res, this.focusApp.code).subscribe((data: { data: any; ok: boolean }) => {
          this.getPoints();
        }, (error) => {
          console.error(error);
        });
      }
    });
  }
  openEditPointDialog(){
    const dialogRef = this.dialog.open(AddPointDialogComponent, {
      data: {message: 'Edit Point',
        name: this.selectedRow.name, code: this.selectedRow.code, initial_points: this.selectedRow.initial_points,
        max_points: this.selectedRow.max_points, daily_max: this.selectedRow.daily_max, is_default: this.selectedRow.daily_max,
        abbreviation: this.selectedRow.abbreviation},
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.endpointsService.putPoint(res, this.focusApp.code, this.selectedRow.code).subscribe((data: { point: any; ok: boolean }) => {
          this.getPoints();
          this.selectedRow = null;
        }, (error) => {
          console.error(error);
        });
      }
    });
  }
  deletePoint(){
    this.endpointsService.deletePoint(this.focusApp.code, this.selectedRow.code).subscribe( () => {
      this.getPoints();
      this.selectedRow = null;
    },  (error) => {
      console.error(error);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filter = filterValue.trim().toLowerCase();
  }
  select(row){
    this.selectedRow = row;
  }
}
