import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaiLProjectFrontComponent } from './detai-lproject-front.component';

describe('DetaiLProjectFrontComponent', () => {
  let component: DetaiLProjectFrontComponent;
  let fixture: ComponentFixture<DetaiLProjectFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaiLProjectFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaiLProjectFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
