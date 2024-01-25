import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  urlApi = environment.urlApibase;
  event_id = environment.event_id;

  constructor(private http: HttpClient) { }

  getAllEventsUser(user_id){
    return this.http.get<any>(`${this.urlApi}/users/${user_id}/events`);
  }

  GetEventInformationById(id: any) {
    return this.http.get<any>(`${this.urlApi}/events/${this.event_id}/detail/documents`);
  }
}
