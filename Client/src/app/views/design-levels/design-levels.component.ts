import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-design-levels',
  templateUrl: './design-levels.component.html',
  styleUrls: ['./design-levels.component.css']
})
export class DesignLevelsComponent implements OnInit {

  constructor() { }

  table = new MatTableDataSource([{name: 'Level 1', pointsUsed: 'Experience Points', threshold: 0},
    { name: 'Level 2', pointsUsed: 'Experience Points', threshold: 10},
    { name: 'Novice', pointsUsed: 'Good Answers', threshold: 3}]);
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
