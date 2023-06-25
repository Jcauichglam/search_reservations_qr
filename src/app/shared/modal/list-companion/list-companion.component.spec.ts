import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompanionComponent } from './list-companion.component';

describe('ListCompanionComponent', () => {
  let component: ListCompanionComponent;
  let fixture: ComponentFixture<ListCompanionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCompanionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCompanionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
