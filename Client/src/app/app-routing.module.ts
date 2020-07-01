import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {DesignComponent} from './views/design/design.component';
import {DesignPointsComponent} from './views/design-points/design-points.component';
import {DesignLevelsComponent} from './views/design-levels/design-levels.component';
import {PlayersComponent} from './views/players/players.component';
import {AppManagementComponent} from './views/app-management/app-management.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'design', component: DesignComponent},
  { path: 'design/points', component: DesignPointsComponent},
  { path: 'design/levels', component:  DesignLevelsComponent},
  { path: 'players', component: PlayersComponent},
  { path: 'management', component: AppManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
