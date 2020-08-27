import { Component, OnInit } from '@angular/core';
import {EndpointsService} from '../../endpoints/endpoints.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

  constructor(protected endpointsService: EndpointsService, private route: ActivatedRoute) { }
  player: any = {};
  completedChallenges = [];
  playerPoints = [];
  playerActions = [];
  playerBadges = [];
  focusApp: any = {}
  code: string;
  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.code = params.get('player_code');
     });
     this.getActiveApp();
  }

  getActiveApp(){
    this.endpointsService.getActiveApp().subscribe((data: {data: object, ok: boolean}) => { // Success
        this.focusApp = data.data;
        this.getPlayer();
        this.getPlayerCompletedChallenges();
        this.getPlayerPoints();
        this.getPlayerActions();
        this.getPlayerBadges();
      },
      (error) => {
        console.error(error);
      });
  }

  getPlayer(){
    this.endpointsService.getPlayer(this.focusApp.code, this.code).subscribe((data: {data: any[], ok: boolean}) => { // Success
        this.player = data.data;
      },
      (error) => {
        console.error(error);
      });
  }
  getPlayerCompletedChallenges(){
    this.endpointsService.getPlayerCompletedChallenges(this.focusApp.code, this.code).subscribe((data: {data: any[], ok: boolean}) => { // Success
      this.completedChallenges = data.data;
    },
    (error) => {
      console.error(error);
    });
  }
  getPlayerPoints(){
    this.endpointsService.getPlayerPoints(this.focusApp.code, this.code).subscribe((data: {data: any[], ok: boolean}) => { // Success
      this.playerPoints = data.data;
    },
    (error) => {
      console.error(error);
    });
  }
  getPlayerActions(){
    this.endpointsService.getPlayerActions(this.focusApp.code, this.code).subscribe((data: {actions: any[], ok: boolean}) => { // Success
      this.playerActions = data.actions;
    },
    (error) => {
      console.error(error);
    });
  }
  getPlayerBadges(){
    this.endpointsService.getPlayerBadges(this.focusApp.code, this.code).subscribe((data: {data: any[], ok: boolean}) => { // Success
      this.playerBadges = data.data;
    },
    (error) => {
      console.error(error);
    });
  }

}
