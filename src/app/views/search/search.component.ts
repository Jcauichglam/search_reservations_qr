import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  formSearch: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router) {
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

}
