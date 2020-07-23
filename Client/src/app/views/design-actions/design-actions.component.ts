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
  ngOnInit(): void {
    this.getActions();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filter = filterValue.trim().toLowerCase();
  }

  select(row){
    this.selectedRow = row;
  }

  getActions(){
    this.endpointsService.getActions('NEURONE').subscribe((data: {
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
      data: {message: 'Create New Action'},
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.endpointsService.postAction(res, 'NEURONE').subscribe((data: { action: any; ok: boolean }) => {
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
        name: this.selectedRow.name, description: this.selectedRow.description, repeatable: this.selectedRow.repeatable},
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.endpointsService.putAction(res, this.selectedRow.app_name, this.selectedRow._id).subscribe((data: { action: any; ok: boolean }) => {
          this.getActions();
          this.selectedRow = null;
        }, (error) => {
          console.error(error);
        });
      }
    });
  }
  deleteAction(){
    this.endpointsService.deleteAction(this.selectedRow.app_name, this.selectedRow._id).subscribe( () => {
      this.getActions();
      this.selectedRow = null;
    },  (error) =>{
      console.error(error);
    });
  }

}
