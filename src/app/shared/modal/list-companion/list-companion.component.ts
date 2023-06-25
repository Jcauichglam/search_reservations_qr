import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RestaurantService } from '../../services/restaurant.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-list-companion',
  templateUrl: './list-companion.component.html',
  styleUrls: ['./list-companion.component.css']
})
export class ListCompanionComponent implements OnInit {
  dataCompanion: any;
  companion: Array<any> = [];
  data: any;
  config: any;
  selectView: any;
  dataParticipant: any;
  modalRef?: BsModalRef;
  keyword = 'RestName';
  event_id: any;
  user_id: any;
  listInternalAttende = true;
  searchText: string;
  tokenData: any;

  constructor(
    private modalService: BsModalService,
    private restaurantService: RestaurantService,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.getCompanion();
  }

  getCompanion() {
    this.ngxService.start();
    this.restaurantService.GetCompanionByReservation(this.config.reservation_id).subscribe((result) => {
      this.dataCompanion = result;
      this.ngxService.stop();
    });
  }

  close() {
    this.modalService.hide();
  }

  // onFocused(e) {
  //   // do something
  // }

  // getInformationActually(){
  //   this.event_id = this.localStorageService.getItem("select_event");
  //   this.tokenData = this.autheticateService.getDataUser();
  //   console.log(this.tokenData);
  //   this.user_id = this.tokenData.id;
  // }

  // showInternalAttendeList(){
  //   if(this.listInternalAttende){
  //     this.listInternalAttende = false;
  //   }else{
  //     this.listInternalAttende = true;
  //   }
  // }
}
