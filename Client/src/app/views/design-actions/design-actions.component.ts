import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {EndpointsService} from '../../endpoints/endpoints.service';
import { AddActionDialogComponent} from '../../components/add-action-dialog/add-action-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-design-actions',
  templateUrl: './design-actions.component.html',
  styleUrls: ['./design-actions.component.css']
})
export class DesignActionsComponent implements OnInit {

  constructor(protected endpointsService: EndpointsService, public dialog: MatDialog, public translate: TranslateService) { }
  table = new MatTableDataSource([]);
  actions = [];
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
        this.getActions();
      },
      (error) => {
        console.error(error);
      });
  }
  getActions(){
    this.endpointsService.getActions(this.focusApp.code).subscribe((data: {
        actions: any[]; ok: boolean} ) => { // Success
        this.actions = data.actions;
        this.table.data = this.actions;
      },
      (error) => {
        console.error(error);
      });
  }

  openAddActionDialog() {
    let message;
    this.translate.get('action.addActionTitle').subscribe(res => {
      message = res;
    });
    const dialogRef = this.dialog.open(AddActionDialogComponent, {
      data: {message, withCode: false},
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const formData = new FormData();
        formData.append('name', res.name);
        formData.append('description', res.description);
        formData.append('repeatable', res.repeatable.toString());
        formData.append('file', res.file);
        this.endpointsService.postAction(formData, this.focusApp.code).subscribe((data: { action: any; ok: boolean }) => {
          this.getActions();
        }, (error) => {
          console.error(error);
        });
      }
    });
  }
  openEditActionDialog() {
    let message;
    this.translate.get('action.editActionTitle').subscribe(res => {
      message = res;
    });
    const dialogRef = this.dialog.open(AddActionDialogComponent, {
      data: {
        message,
        name: this.selectedRow.name,
        description: this.selectedRow.description,
        repeatable: this.selectedRow.repeatable,
        code: this.selectedRow.code,
        withCode: true
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const formData = new FormData();
        formData.append('name', res.name);
        formData.append('description', res.description);
        formData.append('repeatable', res.repeatable.toString());
        formData.append('file', res.file);
        formData.append('code', res.code);
        this.endpointsService.putAction(formData, this.focusApp.code, this.selectedRow.code).subscribe((data: { action: any; ok: boolean }) => {
          this.getActions();
          this.selectedRow = null;
        }, (error) => {
          console.error(error);
        });
      }
    });
  }
  deleteAction(){
    this.endpointsService.deleteAction(this.focusApp.code, this.selectedRow.code).subscribe( () => {
      this.getActions();
      this.selectedRow = null;
    },  (error) => {
      console.error(error);
    });
  }



}
