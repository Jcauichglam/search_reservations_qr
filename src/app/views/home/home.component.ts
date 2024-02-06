import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlane, faPersonSwimming, faUtensils, faUser, faUserCheck, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { ListCompanionComponent } from 'src/app/shared/modal/list-companion/list-companion.component';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ListCompanionNotPropertyComponent } from 'src/app/shared/modal/list-companion-not-property/list-companion-not-property.component';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EventsService } from 'src/app/shared/services/events.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  faHand = faUser;
  urlTree: any;
  email: any;
  userInfo: any;
  iconplane = faPlane
  iconNotes = faNoteSticky;
  iconSwwinming = faPersonSwimming;
  iconRestaurant = faUtensils;
  iconuser = faUserCheck;
  selectOption: any;
  userInfoRestaurant: any;
  dataReservationsOwner: any;
  modalRef?: BsModalRef;
  dataActivity: any;
  dataInformationArrival: any;
  dataInformationDeparture: any;
  dataResertaurantReservation: any;
  dataInformationCompanionEmail: any;
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  isViewCompanion: boolean = false;
  dataEvent: any = [];
  event_id = environment.event_id;
  notifications: any;
  dataInformationDepartureCompanion: any;
  dataActivityCompanion: any;

  constructor(
    private router: Router,
    private userService: UsersService,
    private restaurantService: RestaurantService,
    private modalService: BsModalService,
    private activitieService: ActivityService,
    private ngxService: NgxUiLoaderService,
    private eventServices: EventsService,
    private notificationsServices: NotificationService
  ) { }

  ngOnInit(): void {
    this.getUrlParams();
    this.getCompanionInformation()
    this.getInformationUser();
    this.getAllMyReservations();
  }

  getUrlParams(){
    this.urlTree = this.router.parseUrl(this.router.url);

    this.email = this.urlTree.queryParams['email'];
    this.getInformationByEmail();
  }

  selectOptionReservation(option){
    this.selectOption = option;

    if(option == 1){
      this.getAllMyReservations();
    }
    else if(option == 2){
      this.getListReservationActivity();
      if(this.dataInformationCompanionEmail.email_companion != "" && this.dataInformationCompanionEmail.email_companion != null){
        this.isViewCompanion = true;
        this.getListReservationActivityCompanion();
      }else{
        this.isViewCompanion = false;
      }
    }else if(option == 4){
      if(this.dataInformationCompanionEmail.email_companion != "" && this.dataInformationCompanionEmail.email_companion != null){
        this.dataInformationArrival = null;
        this.dataInformationDeparture = null;
        this.dataResertaurantReservation = null;
        this.getListReservationCompanionRestaurant();
        // this.getListReservationActivityCompanion();
        // this.getDataArrivalCompanion();
        // this.getDataDepartureCompanion();
        this.isViewCompanion = true;
      }else{
        this.isViewCompanion = false;
      }
    }else if(option == 3){
      this.getDataDeparture();
      if(this.dataInformationCompanionEmail.email_companion != "" && this.dataInformationCompanionEmail.email_companion != null){
        this.isViewCompanion = true;
        this.getDataDepartureCompanion();
      }else{
        this.isViewCompanion = false;
      }
      // this.getDataArrival();

    }else if(option == 5){
      // this.getInformationByEmail();
      this.getEventsByUserId();
    }else if(option == 6){
      this.getNotificationsByEventId();
    }
  }

  getNotificationsByEventId(){
    this.ngxService.start();
    this.notificationsServices.GetNotificationsByEventId(this.event_id).subscribe(result => {
      this.notifications = result;
      this.ngxService.stop();
    })
  }

  getEventsByUserId(){
    this.dataEvent = [];
      this.ngxService.start();

      this.eventServices.GetEventInformationById(this.event_id).subscribe(result =>{
        if(result != null){
          this.dataEvent.push(result);
          this.ngxService.stop();
        }
      })
      // this.eventServices.getAllEventsUser(this.userInfoRestaurant.id).subscribe(result =>{
      //   result.forEach(element => {

      //   });
      //   this.ngxService.stop();
      // })
  }

  getListReservationCompanion(){
    alert("debe cargar companion");
  }

  getAllMyReservations(){
    debugger;
    if(this.event_id != 9 && this.event_id != 10){
      if(this.userInfoRestaurant != null){
        this.ngxService.start();
        this.restaurantService.GetMyReservationsByParticipantId(this.userInfoRestaurant.id).subscribe(result => {
          this.dataReservationsOwner = result;
          this.ngxService.stop();
        })
      }
    }else if(this.event_id == 9){

      let reservationObject = {
        companion_lastname: "Foxx",
        companion_name: "Mona",
        date_Reservation: "01/30/2024 00:00:00",
        email: "dfoxx@actalentservices.com",
        id: 184,
        lastName: "Foxx",
        name: "Dee",
        name_hotel: "JW MARRIOTT",
        name_restaurant: "DINNER AT PAROLE",
        pax: 8,
        pickUp: "6:30 PM",
        time_Reservation: "7:00 PM",
        type_Reservation: 2,
        type_participant: "owner"
      };
      const reservationArray: any[] = [];

      reservationArray.push(reservationObject);

      reservationObject = {
        companion_lastname: "Foxx",
        companion_name: "Mona",
        date_Reservation: "01/30/2024 00:00:00",
        email: "dfoxx@actalentservices.com",
        id: 184,
        lastName: "Foxx",
        name: "Dee",
        name_hotel: "JW MARRIOTT",
        name_restaurant: "After Dinner Party at Confessions",
        pax: 8,
        pickUp: "",
        time_Reservation: "9:00 PM",
        type_Reservation: 2,
        type_participant: "owner"
      };
      reservationArray.push(reservationObject);

      this.dataReservationsOwner = reservationArray;
    }else if(this.event_id == 10){

      let reservationObject = {
        companion_lastname: "Foxx",
        companion_name: "Mona",
        date_Reservation: "02/04/2024 00:00:00",
        email: "dfoxx@actalentservices.com",
        id: 184,
        lastName: "Foxx",
        name: "Dee",
        name_hotel: "JW MARRIOTT",
        name_restaurant: "DINNER AT PAROLE",
        pax: 8,
        pickUp: "6:30 PM",
        time_Reservation: "7:00 PM",
        type_Reservation: 2,
        type_participant: "owner"
      };
      const reservationArray: any[] = [];

      reservationArray.push(reservationObject);

      reservationObject = {
        companion_lastname: "Foxx",
        companion_name: "Mona",
        date_Reservation: "02/04/2024 00:00:00",
        email: "dfoxx@actalentservices.com",
        id: 184,
        lastName: "Foxx",
        name: "Dee",
        name_hotel: "JW MARRIOTT",
        name_restaurant: "After Dinner Party at Confessions",
        pax: 8,
        pickUp: "",
        time_Reservation: "9:00 PM",
        type_Reservation: 2,
        type_participant: "owner"
      };
      reservationArray.push(reservationObject);

      this.dataReservationsOwner = reservationArray;
    }
  }

  showModalListCompanion(id, Date_Reservation){
    const initialState = {
      config: {
        title: "Users Infomation",
        reservation_id: id,
        date_reservation: Date_Reservation
      }
    };
    this.modalRef = this.modalService.show(ListCompanionComponent, {
      initialState,
      animated: true,
      class: 'modal-xl'
    });
  }

  getInformationUser(){
    this.ngxService.start();
    this.userService.getInformationUser(this.email, 1).subscribe(result => {
      this.userInfo = result;
      this.ngxService.stop();
    })
  }

  getInformationByEmail(){
    this.ngxService.start();
    debugger;
    this.userService.getInformationUserRestaurant(this.email).subscribe(result => {
      this.userInfoRestaurant = result;
      this.selectOptionReservation(1);
      this.ngxService.stop();
    })
  }

  showModalListCompanionView(id, Date_Reservation){
    const initialState = {
      config: {
        title: "Users Infomation",
        reservation_id: id,
        date_reservation: Date_Reservation
      }
    };
    this.modalRef = this.modalService.show(ListCompanionNotPropertyComponent, {
      initialState,
      animated: true,
      class: 'modal-xl'
    });
  }

  getListReservationActivity(){
    this.ngxService.start();
    this.activitieService.getActivityByeEmail(this.email).subscribe(result => {
      this.dataActivity = result;
      this.ngxService.stop();
    })
  }

  getDataArrival(){
    this.ngxService.start();
    this.userService.getInformationUser(this.email, 1).subscribe(result => {
      this.dataInformationArrival = result;
      this.ngxService.stop();
    })
  }

  getDataDeparture(){
    this.ngxService.start();
    this.userService.getInformationUser(this.email, 2).subscribe(result => {
      this.dataInformationDeparture = result;
      this.ngxService.stop();
    })
  }

  getListReservationCompanionRestaurant(){
    this.ngxService.start();
    this.userService.getReservationRestaurant(this.dataInformationCompanionEmail.email_companion).subscribe(result => {
      this.dataResertaurantReservation = result;
      this.ngxService.stop();
    })
  }

  getListReservationActivityCompanion(){
    this.ngxService.start();
    this.activitieService.getActivityByeEmail(this.dataInformationCompanionEmail.email_companion).subscribe(result => {
      this.dataActivityCompanion = result;
      this.ngxService.stop();
    })
  }

  getCompanionInformation(){
    this.ngxService.start();
    this.userService.getReservationCompanion(this.email).subscribe(result => {
      this.ngxService.stop();
      this.dataInformationCompanionEmail = result;
    })
  }

  getDataArrivalCompanion(){
    this.ngxService.start();
    this.userService.getInformationUser(this.dataInformationCompanionEmail.email_companion, 1).subscribe(result => {
      this.dataInformationArrival = result;
      this.ngxService.stop();
    })
  }

  getDataDepartureCompanion(){
    this.ngxService.start();
    this.userService.getInformationUser(this.dataInformationCompanionEmail.email_companion, 2).subscribe(result => {
      this.dataInformationDepartureCompanion = result;
      this.ngxService.stop();
    })
  }
}
