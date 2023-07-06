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

  subscribeTokenToTopic(token, topic) {
    fetch('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/'+topic, {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'key=AAAA5GyNeHU:APA91bFixIJ81__9OGoEffXyuEHPdEcGhb2lOfocMswAoGmZIxJKh92fWS5dYjl-6DfWSNiDSpgN98PDghbRzLZRq45kbOE3Bes6L0zMjViWWEvXr1SLRIZnmxrnnbGMlUvzEu1Bfo1k'
      })
    }).then(response => {
      if (response.status < 200 || response.status >= 400) {
        throw 'Error subscribing to topic: '+response.status + ' - ' + response.text();
      }
      console.log('Subscribed to "'+topic+'"');
    }).catch(error => {
      console.error(error);
    })
  }
}
