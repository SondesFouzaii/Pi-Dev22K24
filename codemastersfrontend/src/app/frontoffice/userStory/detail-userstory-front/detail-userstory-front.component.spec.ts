import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUserstoryFrontComponent } from './detail-userstory-front.component';

describe('DetailUserstoryFrontComponent', () => {
  let component: DetailUserstoryFrontComponent;
  let fixture: ComponentFixture<DetailUserstoryFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailUserstoryFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailUserstoryFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
