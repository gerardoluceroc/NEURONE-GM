import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  constructor(protected http: HttpClient) { }

  rootURL = 'http://localhost:3080/api/';

  /* APPS */
  getActiveApp() {
    return this.http.get(this.rootURL + 'applications/1/focus');
  }
  getApps() {
    return this.http.get(this.rootURL + 'applications');
  }
  changeActiveApp(newActive){
    return this.http.post(this.rootURL + 'applications/1/changeActive', newActive);
  }
  postApp(newApp){
    return this.http.post(this.rootURL + 'applications', newApp);
  }
  putApp(updatedApp, appCode){
    return this.http.put(this.rootURL + 'applications/' + appCode, updatedApp);
  }
  deleteApp(appCode){
    return this.http.delete(this.rootURL + 'applications/' + appCode);
  }
  getAppSummary(appCode){
    return this.http.get(this.rootURL + 'applications/' + appCode + '/summary');
  }
  /* PLAYERS */
  getPlayers(appCode){
    return this.http.get(this.rootURL + appCode + '/players');
  }
  getPlayer(appCode, playerCode){
    return this.http.get(this.rootURL + appCode + '/players/' + playerCode);
  }
  getPlayerCompletedChallenges(appCode, playerCode){
    return this.http.get(this.rootURL + appCode + '/players/' + playerCode + '/completed-challenges');
  }
  getPlayerPoints(appCode, playerCode){
    return this.http.get(this.rootURL + appCode + '/players/' + playerCode + '/player-points');
  }
  /* ACTIONS */
  getActions(appCode){
    return this.http.get(this.rootURL + appCode + '/actions');
  }
  postAction(newAction, appCode){
    return this.http.post(this.rootURL + appCode + '/actions', newAction);
  }
  putAction(updatedAction, appCode, actionCode){
    return this.http.put( this.rootURL + appCode + '/actions/' + actionCode, updatedAction);
  }
  deleteAction(appCode, actionCode){
    return this.http.delete( this.rootURL + appCode + '/actions/' + actionCode);
  }
  getOneAction(appCode, actionCode){
    return this.http.get(this.rootURL + appCode + '/actions/' + actionCode);
  }
  /* POINTS */
  getPoints(appCode){
    return this.http.get(this.rootURL + appCode + '/points');
  }
  postPoint(newPoint, appCode){
    return this.http.post(this.rootURL + appCode + '/points', newPoint);
  }
  putPoint(updatedPoint, appCode, pointCode){
    return this.http.put( this.rootURL + appCode + '/points/' + pointCode, updatedPoint);
  }
  deletePoint(appCode, pointCode){
    return this.http.delete( this.rootURL + appCode + '/points/' + pointCode);
  }
  getOnePoint(appcode, pointCode){
    return this.http.get( this.rootURL + appcode + '/points/' + pointCode);
  }
  /* LEVELS */
  getLevels(appCode){
    return this.http.get(this.rootURL + appCode + '/levels');
  }
  postLevel(newLevel, appCode){
    return this.http.post(this.rootURL + appCode + '/levels', newLevel);
  }
  putLevel(updatedLevel, appCode, levelCode){
    return this.http.put( this.rootURL + appCode + '/levels/' + levelCode, updatedLevel);
  }
  deleteLevel(appCode, levelCode){
    return this.http.delete( this.rootURL + appCode + '/levels/' + levelCode);
  }
  /* CHALLENGES */
  getChallenges(appCode){
    return this.http.get(this.rootURL + appCode + '/challenges');
  }
  postChallenge(newChallenge, appCode){
    return this.http.post(this.rootURL + appCode + '/challenges', newChallenge);
  }
  putChallenge(updatedChallenge, appCode, challengeCode){
    return this.http.put( this.rootURL + appCode + '/challenges/' + challengeCode, updatedChallenge);
  }
  deleteChallenge(appCode, challengeCode){
    return this.http.delete( this.rootURL + appCode + '/challenges/' + challengeCode);
  }
  /* LEADERBOARDS */
  getLeaderboards(appCode){
    return this.http.get(this.rootURL + appCode + '/leaderboards');
  }
  postLeaderboards(newLeaderboard, appCode){
    return this.http.post(this.rootURL + appCode + '/leaderboards', newLeaderboard);
  }
  putLeaderboard(updatedLeaderboard, appCode, leaderboardCode){
    return this.http.put( this.rootURL + appCode + '/leaderboards/' + leaderboardCode, updatedLeaderboard);
  }
  deleteLeaderboard(appCode, leaderboardCode){
    return this.http.delete( this.rootURL + appCode + '/leaderboards/' + leaderboardCode);
  }
  getLeaderboardData(appCode, leaderboardCode){
    return this.http.post(this.rootURL + appCode + '/leaderboards/' + leaderboardCode + '/generate', null);
  }
  getOneLeaderboard(appCode, leaderboardCode){
    return this.http.get(this.rootURL + appCode + '/leaderboards/' + leaderboardCode);
  }
}
