import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  urlApi = environment.urlApibase;
  email: string;

  constructor(private http: HttpClient) { }

  getInformationUser(email: any, type_flight: any) {
    let params = new HttpParams();
    params = params.append('email', email);

    return this.http.get<any>(`${this.urlApi}/users/participant/${type_flight}/information`, { params });
  }

  getInformationUserRestaurant(email: any) {
    let params = new HttpParams();
    params = params.append('email', email);

    return this.http.get<any>(`${this.urlApi}/restaurants/participant`, { params });
  }

  getReservationRestaurant(email) {
    let params = new HttpParams();
    params = params.append('email', email);

    return this.http.get<any>(`${this.urlApi}/users/companion/reservations`, { params });
  }

  getReservationCompanion(email) {
    let params = new HttpParams();
    params = params.append('email', email);

    return this.http.get<any>(`${this.urlApi}/users/companion/detail`, { params });
  }

  getSearchUserAuto(event_id, search) {
    let params = new HttpParams();
    params = params.append('search', search);

    return this.http.get<any>(`${this.urlApi}/users/${event_id}/events/search`, { params });
  }

  checkAcces(user: string, password: string) {
    let json = {
      "user": user,
      "password": password
    };
    this.email = user;
    return this.http.post<boolean>(`${this.urlApi}/users/events/${0}/access`, json);
  }

  isAuthenticated(): boolean {
    let itemStr = localStorage.getItem("access");
    if (!itemStr) {
      return false;
    }
    // const item = JSON.parse(itemStr)
    // const now = new Date()


    // if (now.getTime() > item.expiry) {
    //   localStorage.removeItem("access")
    //   return false;
    // }
    localStorage.removeItem("access");
    return true;
  }
}
