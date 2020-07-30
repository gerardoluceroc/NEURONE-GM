import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {EndpointsService} from '../../endpoints/endpoints.service';
import {MatDialog} from '@angular/material/dialog';
import {AddLevelDialogComponent} from '../../components/add-level-dialog/add-level-dialog.component';

@Component({
  selector: 'app-design-levels',
  templateUrl: './design-levels.component.html',
  styleUrls: ['./design-levels.component.css']
})
export class DesignLevelsComponent implements OnInit {

  constructor(protected endpointsService: EndpointsService, public dialog: MatDialog) { }

  table = new MatTableDataSource([]);
  levels = [];
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
        this.getLevels();
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
      },
      (error) => {
        console.error(error);
      });
  }
  getLevels(){
    this.endpointsService.getLevels(this.focusApp.code).subscribe((data: {
        data: any[]; ok: boolean} ) => { // Success
        this.levels = data.data;
        this.table.data = this.levels;
      },
      (error) => {
        console.error(error);
      });
  }

  openAddLevelDialog(){
    const dialogRef = this.dialog.open(AddLevelDialogComponent, {
      data: {message: 'Create New Level', points: this.points, withCode: false},
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        console.log(res);
        this.endpointsService.postLevel(res, this.focusApp.code).subscribe((data: { data: any; ok: boolean }) => {
          this.getLevels();
        }, (error) => {
          console.error(error);
        });
      }
    });
  }
  openEditLevelDialog(){
    const dialogRef = this.dialog.open(AddLevelDialogComponent, {
      data: {message: 'Edit Action',
        name: this.selectedRow.name, description: this.selectedRow.description, point_required: this.selectedRow.point_required.code,
        code: this.selectedRow.code, point_threshold: this.selectedRow.point_threshold, points: this.points, withCode: true},
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.endpointsService.putLevel(res, this.focusApp.code, this.selectedRow.code).subscribe((data: { data: any; ok: boolean }) => {
          this.getLevels();
          this.selectedRow = null;
        }, (error) => {
          console.error(error);
        });
      }
    });
  }
  deleteLevel(){
    this.endpointsService.deleteLevel(this.focusApp.code, this.selectedRow.code).subscribe( () => {
      this.getLevels();
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
