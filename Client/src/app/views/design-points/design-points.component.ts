import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {EndpointsService} from '../../endpoints/endpoints.service';
import {MatDialog} from '@angular/material/dialog';
import {AddPointDialogComponent} from '../../components/add-point-dialog/add-point-dialog.component';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-design-points',
  templateUrl: './design-points.component.html',
  styleUrls: ['./design-points.component.css']
})
export class DesignPointsComponent implements OnInit {

  constructor(protected endpointsService: EndpointsService, public dialog: MatDialog, public translate: TranslateService) { }
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
  openAddPointDialog() {
    let message;
    this.translate.get('point.addPointTitle').subscribe(res => {
      message = res;
    });
    const dialogRef = this.dialog.open(AddPointDialogComponent, {
      data: {message, withCode: false},
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const formData = new FormData();
        formData.append('name', res.name);
        formData.append('abbreviation', res.abbreviation);
        formData.append('initial_points', res.initial_points);
        formData.append('max_points', res.max_points);
        formData.append('daily_max', res.daily_max);
        formData.append('is_default', res.is_default.toString());
        formData.append('hidden', res.hidden.toString());
        formData.append('file', res.file);
        this.endpointsService.postPoint(formData, this.focusApp.code).subscribe((data: { data: any; ok: boolean }) => {
          this.getPoints();
        }, (error) => {
          console.error(error);
        });
      }
    });
  }
  openEditPointDialog() {
    let message;
    this.translate.get('point.editPointTitle').subscribe(res => {
      message = res;
    });
    const dialogRef = this.dialog.open(AddPointDialogComponent, {
      data: {
        message,
        name: this.selectedRow.name,
        code: this.selectedRow.code,
        initial_points: this.selectedRow.initial_points,
        max_points: this.selectedRow.max_points,
        daily_max: this.selectedRow.daily_max,
        is_default: this.selectedRow.is_default,
        hidden: this.selectedRow.hidden,
        abbreviation: this.selectedRow.abbreviation,
        withCode: true
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const formData = new FormData();
        formData.append('name', res.name);
        formData.append('code', res.code);
        formData.append('abbreviation', res.abbreviation);
        formData.append('initial_points', res.initial_points);
        formData.append('max_points', res.max_points);
        formData.append('daily_max', res.daily_max);
        formData.append('is_default', res.is_default.toString());
        formData.append('hidden', res.hidden.toString());
        formData.append('file', res.file);
        this.endpointsService.putPoint(formData, this.focusApp.code, this.selectedRow.code).subscribe((data: { point: any; ok: boolean }) => {
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
