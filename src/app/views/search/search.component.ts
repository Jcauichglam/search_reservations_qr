import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {

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
  constructor(private fb: FormBuilder,
    private router: Router,
    private userServices: UsersService) {
  }

  ngOnInit(): void {
    this.initFormSearch();
  }

  initFormSearch(){
    this.formSearch = this.fb.group({
      email: ['', Validators.required]
    });
  }

  searchReservation(){
    this.router.navigate(
      ['/search'],
      { queryParams: { email: this.formSearch.controls['email'].value } }
    );
  }

  selectEvent(item) {
    console.log(item);
    this.formSearch.get("email").setValue(item.email);
  }

  onChangeSearch(val: string) {
    this.userServices.getSearchUserAuto(this.event_id, val).subscribe(result => {
      console.log(result);
      this.result_people = result;
    })
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e){
    // do something when input is focused
  }

}
