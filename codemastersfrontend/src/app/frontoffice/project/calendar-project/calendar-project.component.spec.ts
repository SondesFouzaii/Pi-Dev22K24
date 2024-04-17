import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarProjectComponent } from './calendar-project.component';

describe('CalendarProjectComponent', () => {
  let component: CalendarProjectComponent;
  let fixture: ComponentFixture<CalendarProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
