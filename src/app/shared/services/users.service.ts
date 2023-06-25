import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  urlApi = environment.urlApibase;

  constructor(private http: HttpClient) { }

  getInformationUser(email: any, type_flight: any){
    let params = new HttpParams();
    params = params.append('email', email);

    return this.http.get<any>(`${this.urlApi}/users/participant/${type_flight}/information`, { params });
  }

  getInformationUserRestaurant(email: any){
    let params = new HttpParams();
    params = params.append('email', email);

    return this.http.get<any>(`${this.urlApi}/restaurants/participant`, { params });
  }

}
