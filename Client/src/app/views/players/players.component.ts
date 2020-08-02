import { Component, OnInit } from '@angular/core';
import {EndpointsService} from '../../endpoints/endpoints.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  constructor(protected endpointsService: EndpointsService) { }
  focusApp: any = {};
  players = [];
  ngOnInit(): void {
    this.getActiveApp();
  }
  getActiveApp(){
    this.endpointsService.getActiveApp().subscribe((data: {data: object, ok: boolean}) => { // Success
        this.focusApp = data.data;
        this.getPlayers();
      },
      (error) => {
        console.error(error);
      });
  }
  getPlayers(){
    this.endpointsService.getPlayers(this.focusApp.code).subscribe((data: {players: any[], ok: boolean}) => { // Success
        this.players = data.players;
        console.log(data);
      },
      (error) => {
        console.error(error);
      });
  }

}
