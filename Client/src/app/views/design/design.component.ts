import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {

  constructor() { }
  @Input() marked: string;
  points = false;
  levels = false;
  missions = false;
  rules = false;
  badges = false;
  ngOnInit(): void {
    // con este switch se resalta la etiqueta del sidebar en la que se encuentra el usuario
    switch (this.marked) {
      case 'points':
        this.points = true;
        break;
      case 'levels':
        this.levels = true;
        break;
      case 'missions':
        this.missions = true;
        break;
      case 'rules':
        this.rules = true;
        break;
      case 'badges':
        this.badges = true;
        break;
      default:
        break;
    }
  }

}
