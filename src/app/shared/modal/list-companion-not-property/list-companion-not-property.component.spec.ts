import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompanionNotPropertyComponent } from './list-companion-not-property.component';

describe('ListCompanionNotPropertyComponent', () => {
  let component: ListCompanionNotPropertyComponent;
  let fixture: ComponentFixture<ListCompanionNotPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCompanionNotPropertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCompanionNotPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
