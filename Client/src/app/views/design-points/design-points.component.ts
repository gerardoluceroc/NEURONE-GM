import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-design-points',
  templateUrl: './design-points.component.html',
  styleUrls: ['./design-points.component.css']
})
export class DesignPointsComponent implements OnInit {

  constructor() { }
  table = new MatTableDataSource([{name: 'Experience Points', type: 'regular', abbreviation: 'EXP', hidden: 'no'},
    { name: 'Good Answers', type: 'regular', abbreviation: 'GA', hidden: 'yes'}]);
  displayedColumns: string[] = ['name'];
  selectedRow = null;
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
