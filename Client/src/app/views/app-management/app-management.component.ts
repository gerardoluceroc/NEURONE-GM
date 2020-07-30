import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {EndpointsService} from '../../endpoints/endpoints.service';
import {MatDialog} from '@angular/material/dialog';
import {AddAppDialogComponent} from '../../components/add-app-dialog/add-app-dialog.component';

@Component({
  selector: 'app-app-management',
  templateUrl: './app-management.component.html',
  styleUrls: ['./app-management.component.css']
})
export class AppManagementComponent implements OnInit {

  constructor(protected endpointsService: EndpointsService, public dialog: MatDialog) { }
  table = new MatTableDataSource([]);
  displayedColumns: string[] = ['name'];
  apps = [];
  selectedRow = null;
  focusApp: any = {};
  newFocusApp: any = {};
  change = false;
  appControl = new FormControl('', Validators.required);
  ngOnInit(): void {
    this.getApps();
    this.getActiveApp();
  }

  getApps(){
    this.endpointsService.getApps().subscribe((data: {data: any[], ok: boolean}) => { // Success
        this.apps = data.data;
        this.table.data = this.apps;
      },
      (error) => {
        console.error(error);
      });
  }
  getActiveApp(){
    this.endpointsService.getActiveApp().subscribe((data: {data: object, ok: boolean}) => { // Success
        this.focusApp = data.data;
      },
      (error) => {
        console.error(error);
      });
  }
  changeFocus(){
    this.change = true;
  }
  cancelChange(){
    this.change = false;
  }
  submitChange(){
    this.endpointsService.changeActiveApp({app_code: this.newFocusApp.code}).subscribe((data: {data: object, ok: boolean}) => { // Success
        this.getActiveApp();
        this.change = false;
      },
      (error) => {
        console.error(error);
      });
  }
  openAddAppDialog(){
    const dialogRef = this.dialog.open(AddAppDialogComponent, {
      data: {message: 'Create New App', withCode: false},
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        console.log(res);
        res.owner = 1;
        this.endpointsService.postApp(res).subscribe((data: { data: any; ok: boolean }) => {
          this.getApps();
        }, (error) => {
          console.error(error);
        });
      }
    });
  }
  openEditAppDialog(){
    const dialogRef = this.dialog.open(AddAppDialogComponent, {
      data: {message: 'Edit App',
        name: this.selectedRow.name, description: this.selectedRow.description, code: this.selectedRow.code, withCode: true},
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.endpointsService.putApp(res, this.selectedRow.code).subscribe((data: { data: any; ok: boolean }) => {
          this.getApps();
          this.selectedRow = null;
        }, (error) => {
          console.error(error);
        });
      }
    });
  }
  deleteApp(){
    this.endpointsService.deleteApp( this.selectedRow.code).subscribe( () => {
      this.getApps();
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
