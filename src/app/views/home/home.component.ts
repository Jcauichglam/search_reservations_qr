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

  constructor(
    private router: Router,
    private userService: UsersService,
    private restaurantService: RestaurantService,
    private modalService: BsModalService,
    private activitieService: ActivityService,
    private ngxService: NgxUiLoaderService,
    private eventServices: EventsService
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
    }else if(option == 4){
      if(this.dataInformationCompanionEmail.email_companion != "" && this.dataInformationCompanionEmail.email_companion != null){
        this.getListReservationCompanionRestaurant();
        this.getListReservationActivityCompanion();
        this.getDataArrivalCompanion();
        this.getDataDepartureCompanion();
        this.isViewCompanion = true;
      }else{
        this.isViewCompanion = false;
      }
    }else if(option == 3){
      this.getDataArrival();
      this.getDataDeparture();
    }else if(option == 5){
      this.getEventsByUserId();
    }
  }

  getEventsByUserId(){
    this.ngxService.start();
    this.dataEvent = [];
    this.eventServices.getAllEventsUser(this.userInfoRestaurant.id).subscribe(result =>{
      result.forEach(element => {
        this.eventServices.GetEventInformationById(element.event_Id).subscribe(result =>{
          this.dataEvent.push(result);
          this.ngxService.stop();
        })
      });
    })
  }

  getListReservationCompanion(){
    alert("debe cargar companion");
  }

  getAllMyReservations(){
    this.ngxService.start();
    this.restaurantService.GetMyReservationsByParticipantId(this.userInfoRestaurant.id).subscribe(result => {
      this.dataReservationsOwner = result;
      this.ngxService.stop();
    })
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
      this.dataActivity = result;
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
      this.dataInformationDeparture = result;
      this.ngxService.stop();
    })
  }
}
