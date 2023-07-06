import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAA5GyNeHU:APA91bFixIJ81__9OGoEffXyuEHPdEcGhb2lOfocMswAoGmZIxJKh92fWS5dYjl-6DfWSNiDSpgN98PDghbRzLZRq45kbOE3Bes6L0zMjViWWEvXr1SLRIZnmxrnnbGMlUvzEu1Bfo1k'
    })
  }

  constructor(public http: HttpClient) { }

  sendPushNotification(content) {
    let url = 'https://fcm.googleapis.com/fcm/send';
    let body =
    {
      "notification": {
          "title": content.title,
          "body": content.content
      },
      "to": "/topics/" + content.group
    };

    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAA5GyNeHU:APA91bFixIJ81__9OGoEffXyuEHPdEcGhb2lOfocMswAoGmZIxJKh92fWS5dYjl-6DfWSNiDSpgN98PDghbRzLZRq45kbOE3Bes6L0zMjViWWEvXr1SLRIZnmxrnnbGMlUvzEu1Bfo1k'
    });

    return this.http.post<any>(`${url}`, body, this.httpOptions);
  }

}
