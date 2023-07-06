import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.css']
})
export class NotificationFormComponent {

  formNotification: FormGroup;

  constructor(private fb: FormBuilder,
    private notificationServices: NotificationService) {
  }

  ngOnInit(): void {
    this.initFormSpecialNotes();
  }

  initFormSpecialNotes(){
    this.formNotification = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      group: ['']
    });
  }

  sendNotification(){
    this.notificationServices.sendPushNotification(this.formNotification.value).subscribe(result =>{
      // alert("termino");
      this.formNotification.reset();
    })
  }

}
