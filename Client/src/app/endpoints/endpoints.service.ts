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
  getActions(appName){
    return this.http.get(this.rootURL + appName + '/actions');
  }
  postAction(newAction, appName){
    return this.http.post(this.rootURL + appName + '/actions', newAction);
  }
  putAction(updatedAction, appName, actionId){
    return this.http.put( this.rootURL + appName + '/actions/' + actionId, updatedAction);
  }
  deleteAction(appName, actionId){
    return this.http.delete( this.rootURL + appName + '/actions/' + actionId);
  }
  /* POINTS */
  getPoints(appName){
    return this.http.get(this.rootURL + appName + '/points');
  }
  postPoint(newPoint, appName){
    return this.http.post(this.rootURL + appName + '/points', newPoint);
  }
  putPoint(updatedPoint, appName, pointId){
    return this.http.put( this.rootURL + appName + '/points/' + pointId, updatedPoint);
  }
  deletePoint(appName, pointId){
    return this.http.delete( this.rootURL + appName + '/points/' + pointId);
  }
}
