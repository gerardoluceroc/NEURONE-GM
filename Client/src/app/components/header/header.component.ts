import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  @Input() marked: string;
  design = false;
  players = false;
  management = false;
  home = false;
  ngOnInit(): void {
    // con este switch se resalta la etiqueta del header en la que se encuentra el usuario
    switch (this.marked) {
      case 'design':
        this.design = true;
        break;
      case 'players':
        this.players = true;
        break;
      case 'management':
        this.management = true;
        break;
      case 'home':
        this.home = true;
        break;
      default:
        break;
    }
  }

}
