import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSessionsComponent } from './show-sessions.component';

describe('ShowSessionsComponent', () => {
  let component: ShowSessionsComponent;
  let fixture: ComponentFixture<ShowSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSessionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
