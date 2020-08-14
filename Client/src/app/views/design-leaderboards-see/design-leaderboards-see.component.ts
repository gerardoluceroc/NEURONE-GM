import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {EndpointsService} from '../../endpoints/endpoints.service';


@Component({
  selector: 'app-design-leaderboards-see',
  templateUrl: './design-leaderboards-see.component.html',
  styleUrls: ['./design-leaderboards-see.component.css']
})
export class DesignLeaderboardsSeeComponent implements OnInit {

  constructor(private route: ActivatedRoute, protected endpointsService: EndpointsService) { }
  code: string;
  focusApp: any = {};
  displayedColumns: string[] = ['name', 'last_name', 'amount'];
  dataSource = [];
  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.code = params.get('code');
      });
    this.getActiveApp();
  }
  getActiveApp(){
    this.endpointsService.getActiveApp().subscribe((data: {data: object, ok: boolean}) => { // Success
        this.focusApp = data.data;
        this.getData();
      },
      (error) => {
        console.error(error);
      });
  }
  getData(){
    this.endpointsService.getLeaderboardData(this.focusApp.code, this.code).subscribe((data: {leaderboardResult: any, ok: boolean}) => { // Success
        this.dataSource = data.leaderboardResult;
        console.log(this.dataSource);
      },
      (error) => {
        console.error(error);
      });
  }

}
