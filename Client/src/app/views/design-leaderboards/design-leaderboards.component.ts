import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddLeaderboardDialogComponent} from '../../components/add-leaderboard-dialog/add-leaderboard-dialog.component';
import {EndpointsService} from '../../endpoints/endpoints.service';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-design-leaderboards',
  templateUrl: './design-leaderboards.component.html',
  styleUrls: ['./design-leaderboards.component.css']
})
export class DesignLeaderboardsComponent implements OnInit {

  constructor(public dialog: MatDialog, protected endpointsService: EndpointsService) { }
  table = new MatTableDataSource([]);
  leaderboards = [];
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
        this.getLeaderboards();
      },
      (error) => {
        console.error(error);
      });
  }
  getLeaderboards(){
    this.endpointsService.getLeaderboards(this.focusApp.code).subscribe((data: {
        data: any[]; ok: boolean} ) => { // Success
        this.leaderboards = data.data;
        this.table.data = this.leaderboards;
      },
      (error) => {
        console.error(error);
      });
  }
  openAddLeaderBoardDialog() {
    const dialogRef = this.dialog.open(AddLeaderboardDialogComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe(res => {
      this.endpointsService.postLeaderboards(res, this.focusApp.code).subscribe((data: {
          data: any[]; ok: boolean} ) => { // Success
          this.getLeaderboards();
        },
        (error) => {
          console.error(error);
        });
    });
  }

}
