import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  constructor(protected http: HttpClient) { }

  rootURL = 'http://localhost:3080/api/';

  getActiveApp() {
    return this.http.get(this.rootURL + 'applications/1/focus');
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
}
