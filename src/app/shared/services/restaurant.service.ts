import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  urlApi = environment.urlApibase;

  constructor(private http: HttpClient) { }

  GetMyReservationsByParticipantId(participant_id){
    return this.http.get<any>(`${this.urlApi}/restaurants/reservations/participant/${participant_id}`);
  }

  GetCompanionByReservation(reservation_id) {
    return this.http.get<any>(
      `${this.urlApi}/restaurants/reservations/${reservation_id}/companion`
    );
  }

}
