import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserstoryFrontComponent } from './add-userstory-front.component';

describe('AddUserstoryFrontComponent', () => {
  let component: AddUserstoryFrontComponent;
  let fixture: ComponentFixture<AddUserstoryFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserstoryFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserstoryFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
