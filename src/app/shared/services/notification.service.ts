import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  urlApi = environment.urlApibase;
  group = "aston";
  event_id = environment.event_id;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAA5GyNeHU:APA91bFixIJ81__9OGoEffXyuEHPdEcGhb2lOfocMswAoGmZIxJKh92fWS5dYjl-6DfWSNiDSpgN98PDghbRzLZRq45kbOE3Bes6L0zMjViWWEvXr1SLRIZnmxrnnbGMlUvzEu1Bfo1k'
    })
  }

  constructor(public http: HttpClient) { }

  addNotification(model){
    return this.http.post<any>(`${this.urlApi}/notifications`, {
      Event_Id: this.event_id,
      Title: model.title,
      Message: model.content,
      Email: model.email
    });
  }

  GetNotificationsByEventId(event_id){
    return this.http.get<any>(`${this.urlApi}/notifications/event/${event_id}`);
  }

  sendPushNotification(content) {
    let group = this.group;
    let url = 'https://fcm.googleapis.com/fcm/send';
    let body =
    {
      "notification": {
          "title": content.title,
          "body": content.content
      },
      "to": "/topics/" + group
    };

    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAA5GyNeHU:APA91bFixIJ81__9OGoEffXyuEHPdEcGhb2lOfocMswAoGmZIxJKh92fWS5dYjl-6DfWSNiDSpgN98PDghbRzLZRq45kbOE3Bes6L0zMjViWWEvXr1SLRIZnmxrnnbGMlUvzEu1Bfo1k'
    });

    return this.http.post<any>(`${url}`, body, this.httpOptions);
  }

}
