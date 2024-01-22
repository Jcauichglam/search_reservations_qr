import { Component } from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { NotificationService } from './shared/services/notification.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'search_reservations_qr';
  message: any = null;
  event_id = environment.event_id;

  constructor(private toastr: ToastrService,
    private notificationsServices: NotificationService,
    private ngxServices: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging,
      { vapidKey: environment.firebase.vapidKey }).then((currentToken) => {
        if (currentToken) {
          console.log("Hurraaa!!! we got the token.....");
          console.log(currentToken);
          this.subscribeTokenToTopic(currentToken, "aerotek");
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }

  subscribeTokenToTopic(token, topic) {
    fetch('https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/' + topic, {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'key=AAAA5GyNeHU:APA91bFixIJ81__9OGoEffXyuEHPdEcGhb2lOfocMswAoGmZIxJKh92fWS5dYjl-6DfWSNiDSpgN98PDghbRzLZRq45kbOE3Bes6L0zMjViWWEvXr1SLRIZnmxrnnbGMlUvzEu1Bfo1k'
      })
    }).then(response => {
      if (response.status < 200 || response.status >= 400) {
        throw 'Error subscribing to topic: ' + response.status + ' - ' + response.text();
      }
      console.log('Subscribed to "' + topic + '"');
    }).catch(error => {
      console.error(error);
    })
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
    });
  }

  showAlert() {
    this.ngxServices.start();
    this.notificationsServices.GetNotificationsByEventId(this.event_id).subscribe(result => {
      let total = result.length - 1;
      if (total >= 0) {
        this.toastr.success(result[0].message, result[0].title, {
          timeOut: 8000,
        });
      }
      this.ngxServices.stop();
    })
  }

}
