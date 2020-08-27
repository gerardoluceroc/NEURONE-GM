import { Component, OnInit } from '@angular/core';
import { EndpointsService } from 'src/app/endpoints/endpoints.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { AddBadgeDialogComponent } from 'src/app/components/add-badge-dialog/add-badge-dialog.component';

@Component({
  selector: 'app-design-badges',
  templateUrl: './design-badges.component.html',
  styleUrls: ['./design-badges.component.css']
})
export class DesignBadgesComponent implements OnInit {

  constructor(protected endpointsService: EndpointsService, public dialog: MatDialog, public translate: TranslateService) { }
  table = new MatTableDataSource([]);
  badges = [];
  displayedColumns: string[] = ['title'];
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
        this.getBadges();
      },
      (error) => {
        console.error(error);
      });
  }

  getBadges(){
    this.endpointsService.getBadges(this.focusApp.code).subscribe((data: {
        badges: any[]; ok: boolean} ) => { // Success
        this.badges = data.badges;
        this.table.data = this.badges;
      },
      (error) => {
        console.error(error);
      });
  }

  openAddBadgeDialog() {
    let message;
    this.translate.get('badge.addBadgeTitle').subscribe(res => {
      message = res;
    });
    const dialogRef = this.dialog.open(AddBadgeDialogComponent, {
      data: {message, withCode: false},
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const formData = new FormData();
        formData.append('title', res.title);
        formData.append('description', res.description);
        formData.append('file', res.file);
        this.endpointsService.postBadges(formData, this.focusApp.code).subscribe((data: { data: any; ok: boolean }) => {
          this.getBadges();
        }, (error) => {
          console.error(error);
        });
      }
    });
  }
  openEditBadgeDialog() {
    let message;
    this.translate.get('badge.editBadgeTitle').subscribe(res => {
      message = res;
    });
    const dialogRef = this.dialog.open(AddBadgeDialogComponent, {
      data: {
        message,
        title: this.selectedRow.title,
        description: this.selectedRow.description,
        code: this.selectedRow.code,
        withCode: true
      },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const formData = new FormData();
        formData.append('title', res.title);
        formData.append('description', res.description);
        formData.append('file', res.file);
        formData.append('code', res.code);
        this.endpointsService.putBadge(formData, this.focusApp.code, this.selectedRow.code).subscribe((data: { action: any; ok: boolean }) => {
          this.getBadges();
          this.selectedRow = null;
        }, (error) => {
          console.error(error);
        });
      }
    });
  }
  deleteBadge(){
    this.endpointsService.deleteBadge(this.focusApp.code, this.selectedRow.code).subscribe( () => {
      this.getBadges();
      this.selectedRow = null;
    },  (error) => {
      console.error(error);
    });
  }

}
