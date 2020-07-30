import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {EndpointsService} from '../../endpoints/endpoints.service';
import { AddActionDialogComponent} from '../../components/add-action-dialog/add-action-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-design-actions',
  templateUrl: './design-actions.component.html',
  styleUrls: ['./design-actions.component.css']
})
export class DesignActionsComponent implements OnInit {

  constructor(protected endpointsService: EndpointsService, public dialog: MatDialog) { }
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

  openAddActionDialog(){
    const dialogRef = this.dialog.open(AddActionDialogComponent, {
      data: {message: 'Create New Action', withCode: false},
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        console.log(res);
        this.endpointsService.postAction(res, this.focusApp.code).subscribe((data: { action: any; ok: boolean }) => {
          this.getActions();
        }, (error) => {
          console.error(error);
        });
      }
    });
  }
  openEditActionDialog(){
    const dialogRef = this.dialog.open(AddActionDialogComponent, {
      data: {message: 'Edit Action',
        name: this.selectedRow.name, description: this.selectedRow.description, repeatable: this.selectedRow.repeatable, code: this.selectedRow.code, withCode: true},
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.endpointsService.putAction(res, this.focusApp.code, this.selectedRow.code).subscribe((data: { action: any; ok: boolean }) => {
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
    },  (error) =>{
      console.error(error);
    });
  }



}
