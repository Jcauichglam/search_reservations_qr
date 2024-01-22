import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.css']
})
export class NotificationFormComponent {

  formNotification: FormGroup;

  constructor(private fb: FormBuilder,
    private notificationServices: NotificationService,
    private ngxServices: NgxUiLoaderService) {
  }

  ngOnInit(): void {
    this.initFormSpecialNotes();
  }

  initFormSpecialNotes(){
    this.formNotification = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      group: [''],
      email: ['']
    });
  }

  sendNotification(){
    this.ngxServices.start();



    this.notificationServices.sendPushNotification(this.formNotification.value).subscribe(result =>{
      this.notificationServices.addNotification(this.formNotification.value).subscribe(result => {
        this.formNotification.reset();
        this.ngxServices.stop();
      })
    })
  }

}
