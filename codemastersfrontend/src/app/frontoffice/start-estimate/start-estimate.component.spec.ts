import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartEstimateComponent } from './start-estimate.component';

describe('StartEstimateComponent', () => {
  let component: StartEstimateComponent;
  let fixture: ComponentFixture<StartEstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartEstimateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
