import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {DesignComponent} from './views/design/design.component';
import {DesignPointsComponent} from './views/design-points/design-points.component';
import {DesignLevelsComponent} from './views/design-levels/design-levels.component';
import {DesignActionsComponent} from './views/design-actions/design-actions.component';
import {PlayersComponent} from './views/players/players.component';
import {AppManagementComponent} from './views/app-management/app-management.component';
import {DesignChallengesComponent} from './views/design-challenges/design-challenges.component';
import {DesignLeaderboardsComponent} from './views/design-leaderboards/design-leaderboards.component';
import {DesignBadgesComponent} from './views/design-badges/design-badges.component';
import {DesignLeaderboardsSeeComponent} from './views/design-leaderboards-see/design-leaderboards-see.component';
import { PlayerProfileComponent } from './views/player-profile/player-profile.component';



const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'design', component: DesignComponent},
  { path: 'design/points', component: DesignPointsComponent},
  { path: 'design/levels', component:  DesignLevelsComponent},
  { path: 'design/actions', component: DesignActionsComponent},
  { path: 'design/challenges', component: DesignChallengesComponent},
  { path: 'design/badges', component: DesignBadgesComponent},
  { path: 'design/leaderboards', component: DesignLeaderboardsComponent},
  { path: 'design/leaderboards/see/:code', component: DesignLeaderboardsSeeComponent},
  { path: 'players', component: PlayersComponent},
  { path: 'players/:player_code/profile', component: PlayerProfileComponent},
  { path: 'management', component: AppManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
