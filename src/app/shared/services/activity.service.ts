import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  urlApi = environment.urlApibase;

  constructor(private http: HttpClient) { }

  getActivityByeEmail(email){
    let params = new HttpParams();
    params = params.append('email', email);

    return this.http.get<any>(`${this.urlApi}/activities/reservation/information`, { params });
  }

}
