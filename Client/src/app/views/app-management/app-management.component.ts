import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-app-management',
  templateUrl: './app-management.component.html',
  styleUrls: ['./app-management.component.css']
})
export class AppManagementComponent implements OnInit {

  constructor() { }
  table = new MatTableDataSource([{name: 'First App', description: 'The new App', owner: 'José'},
    { name: 'Second App', description: '-', owner: 'José'}]);
  displayedColumns: string[] = ['name'];
  selectedRow = null;
  appControl = new FormControl('', Validators.required);
  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filter = filterValue.trim().toLowerCase();
  }

  select(row){
    this.selectedRow = row;
  }

}
