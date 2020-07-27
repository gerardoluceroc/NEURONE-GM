import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { DesignComponent } from './views/design/design.component';
import { DesignPointsComponent } from './views/design-points/design-points.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { DesignLevelsComponent } from './views/design-levels/design-levels.component';
import { PlayersComponent } from './views/players/players.component';
import {MatCardModule} from '@angular/material/card';
import { AppManagementComponent } from './views/app-management/app-management.component';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DesignActionsComponent } from './views/design-actions/design-actions.component';
import {EndpointsService} from './endpoints/endpoints.service';
import {HttpClientModule} from '@angular/common/http';
import { AddActionDialogComponent } from './components/add-action-dialog/add-action-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DesignChallengesComponent } from './views/design-challenges/design-challenges.component';
import { AddPointDialogComponent } from './components/add-point-dialog/add-point-dialog.component';
import { AddLevelDialogComponent } from './components/add-level-dialog/add-level-dialog.component';
import { AddChallengeDialogComponent } from './components/add-challenge-dialog/add-challenge-dialog.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DesignComponent,
    DesignPointsComponent,
    DesignLevelsComponent,
    PlayersComponent,
    AppManagementComponent,
    DesignActionsComponent,
    AddActionDialogComponent,
    AddPointDialogComponent,
    DesignChallengesComponent,
    AddLevelDialogComponent,
    AddChallengeDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatListModule,
    MatIconModule
  ],
  providers: [EndpointsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
