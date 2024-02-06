import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PasswordComponent } from 'src/app/shared/modal/password/password.component';
import { UsersService } from 'src/app/shared/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  formSearch: FormGroup;
  event_id = environment.event_id;
  keyword = 'name';
  result_people: any;
  data = [
    {
      id: 1,
      name: 'Georgia'
    },
    {
      id: 2,
      name: 'Usa'
    },
    {
      id: 3,
      name: 'England'
    }
  ];
  isValid: boolean;
  submmit: boolean;

  constructor(private fb: FormBuilder,
    private router: Router,
    private userServices: UsersService,
    private modalService: BsModalService,) {
  }

  ngOnInit(): void {
    this.initFormSearch();
  }

  initFormSearch() {
    this.formSearch = this.fb.group({
      email: ['', Validators.required]
    });
  }

  searchReservation() {
    this.submmit = true;
    if(!this.formSearch.valid)
    return;
    
    let modal = this.modalService.show(PasswordComponent, {
      class: 'modal-dialog-centered'
    });
    modal.content.email = this.formSearch.get("email").value;

    modal.content.result$.subscribe(isValid => {
      this.isValid = isValid;
      if (!this.isValid)
        return;
      modal.hide();
      var object = { value: this.isValid, expiry: new Date().getTime() + 60000 }

      localStorage.setItem("access", JSON.stringify(object));
      this.router.navigate(
        ['/search'],
        { queryParams: { email: this.formSearch.controls['email'].value } }
      );
    });
  }

  selectEvent(item) {
    console.log(item);
    this.formSearch.get("email").setValue(item.email);
  }

  onChangeSearch(val: string) {
    if(!val) {
      this.formSearch.get("email").setValue(val);
      return;
    }
    
    this.userServices.getSearchUserAuto(this.event_id, val).subscribe(result => {
      if (this.event_id == 9) {
        let index = result.findIndex(c => c.email == "tkelly@aerotek.com"
        || c.email == "sjenkins@aerotek.com"
        || c.email == "lzauhar@aerotek.com"
        || c.email == "sschmick@aerotek.com"
        || c.email == "kemartin@aerotek.com"
        || c.email == "jcolvin@aerotek.com"
        || c.email == "jpaulsen@aerotek.com"
        || c.email == "tbartolu@aerotek.com");
        result.splice(index, 1);
      }
      this.result_people = result;
    })
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

}
