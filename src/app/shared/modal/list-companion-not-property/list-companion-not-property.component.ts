import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RestaurantService } from '../../services/restaurant.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-list-companion-not-property',
  templateUrl: './list-companion-not-property.component.html',
  styleUrls: ['./list-companion-not-property.component.css']
})
export class ListCompanionNotPropertyComponent implements OnInit {

  config: any;
  dataCompanion: any;
  companion: Array<any> = [];
  selectView: any;

  ngOnInit(): void {
    this.getCompanion();
  }

  constructor(
    private modalService: BsModalService,
    private restaurantService: RestaurantService,
    private ngxService: NgxUiLoaderService
  ) { }

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

}
