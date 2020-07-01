import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  constructor(protected http: HttpClient) { }

  rootURL = '/api';

}
