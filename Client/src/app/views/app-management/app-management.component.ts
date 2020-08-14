import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {EndpointsService} from '../../endpoints/endpoints.service';
import {MatDialog} from '@angular/material/dialog';
import {AddAppDialogComponent} from '../../components/add-app-dialog/add-app-dialog.component';
import { Subject } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-app-management',
  templateUrl: './app-management.component.html',
  styleUrls: ['./app-management.component.css']
})
export class AppManagementComponent implements OnInit {

  constructor(protected endpointsService: EndpointsService, public dialog: MatDialog, public translate: TranslateService) { }
  table = new MatTableDataSource([]);
  displayedColumns: string[] = ['name'];
  apps = [];
  selectedRow = null;
  focusApp: any = {};
  newFocusApp: any = {};
  change = false;
  appControl = new FormControl('', Validators.required);
  eventsSubject: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    this.getActiveApp();
  }

  emitEventToHeader() {
    this.eventsSubject.next();
  }
  getApps(){
    this.endpointsService.getApps().subscribe((data: {data: any[], ok: boolean}) => { // Success
        this.apps = data.data;
        this.table.data = this.apps;
        let index;
        for (let i = 0; i < this.apps.length; i++){
          if (this.apps[i].code === this.focusApp.code){
            index = i;
          }
        }
        this.newFocusApp = this.apps[index];
        console.log(this.newFocusApp);
      },
      (error) => {
        console.error(error);
      });
  }
  getActiveApp(){
    this.endpointsService.getActiveApp().subscribe((data: {data: object, ok: boolean}) => { // Success
        this.focusApp = data.data;
        this.getApps();
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
        this.emitEventToHeader();
        this.change = false;
      },
      (error) => {
        console.error(error);
      });
  }
  async openAddAppDialog() {
    let message;
    await this.translate.get('appManagement.addAppTitle').subscribe(res => {
      message = res;
    });
    const dialogRef = this.dialog.open(AddAppDialogComponent, {
      data: {message, withCode: false},
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        res.owner = 1;
        this.endpointsService.postApp(res).subscribe((data: { data: any; ok: boolean }) => {
          this.getApps();
        }, (error) => {
          console.error(error);
        });
      }
    });
  }
  async openEditAppDialog() {
    let message;
    await this.translate.get('appManagement.editAppTitle').subscribe(res => {
      message = res;
    });
    const dialogRef = this.dialog.open(AddAppDialogComponent, {
      data: {
        message,
        name: this.selectedRow.name,
        description: this.selectedRow.description,
        code: this.selectedRow.code,
        withCode: true
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
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
