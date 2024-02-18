import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontdashboardComponent } from './frontdashboard.component';

describe('FrontdashboardComponent', () => {
  let component: FrontdashboardComponent;
  let fixture: ComponentFixture<FrontdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
